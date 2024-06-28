<?php

namespace App\Controller;

use App\Entity\Application;
use App\Entity\ApplicationLanguage;
use App\Entity\Experience;
use App\Entity\Formation;
use App\Entity\Skill;
use App\Enum\ApplicationStatusEnum;
use App\Enum\LanguageLevelEnum;
use App\Enum\LevelEnum;
use App\Repository\LanguageRepository;
use App\Repository\OfferRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Constraints\Json;

class ApplicationController extends AbstractController
{
    protected $parameterBag;

    public function __construct(ParameterBagInterface $parameterBag)
    {
        $this->parameterBag = $parameterBag;

    }

    #[Route('api/application/add', name: 'add_application')]
    public function add(Request $request, LanguageRepository $languageRepository, EntityManagerInterface $em, OfferRepository $offerRepository): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            if (\JSON_ERROR_NONE !== json_last_error()) {
                return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
            }

            $application = new Application();
            if ($this->isGranted('ROLE_STUDENT')) {
                $this->getUser()->getStudent()->setPersonalWebsite($data['student']['personal_website']);
                $this->getUser()->getStudent()->setLinkedinLink($data['student']['linkedin']);
                $this->getUser()->getStudent()->setDrivingLicence($data['student']['driving_licence']);
                $this->getUser()->getStudent()->setDisability($data['student']['disability']);
                if (isset($data['student']['cv'])) {
                    $path = $this->addFile('cv', $data['student']['cv_name'], $data['student']['cv'], $this->getUser()->getId());
                    $this->getUser()->getStudent()->setCv($path);
                }
                if (isset($data['student']['letter'])) {
                    $this->addFile('letter', $data['student']['letter_name'], $data['student']['letter'], $this->getUser()->getId());
                    $this->getUser()->getStudent()->setLetter($path);
                }
                if (isset($data['application']['other_document'])) {
                    $this->addFile('other_document', $data['application']['other_document_name'], $data['application']['other_document'], $this->getUser()->getId());
                    $application->setOtherFile($path);
                }
                if (isset($data['student']['pic'])) {
                    $this->addFile('pic', $data['student']['pic_name'], $data['student']['pic'], $this->getUser()->getId());
                    $this->getUser()->setPic($path);
                }
                if (isset($data['application'])) {
                    $formation = new Formation();
                    $grade = match ($data['application']['study_level']) {
                        'CAP' => LevelEnum::CAP,
                        'BAC' => LevelEnum::BAC,
                        'BAC_2' => LevelEnum::BAC_2,
                        'BAC_3' => LevelEnum::BAC_3,
                        'BAC_5' => LevelEnum::BAC_5,
                        'BAC_8' => LevelEnum::BAC_8,
                        default => throw new \InvalidArgumentException('Invalid level value'),
                    };
                    $formation->setLevel($grade);
                    if (isset($data['application']['studies_name'])) {
                        $formation->setName($data['application']['studies_name']);
                    }
                    if (isset($data['application']['school_name'])) {
                        $formation->setSchoolName($data['application']['school_name']);
                    }
                    $this->getUser()->getStudent()->addFormation($formation);
                    $em->persist($formation);
                }
                if (isset($data['skills'])) {
                    foreach ($data['skills'] as $skillName) {
                        $skill = new Skill();
                        $skill->setName($skillName);

                        $this->getUser()->getStudent()->addSkill($skill);
                        $em->persist($skill);
                    }
                }
                if (isset($data['experiences'])) {
                    foreach ($data['experiences'] as $experienceJson) {
                        $experience = new Experience();
                        $experience->setCompanyName($experienceJson['company']);
                        $experience->setPosition($experienceJson['position']);
                        $experience->setDescription($experienceJson['description']);
                        $experience->setStartDate(DateTime::createFromFormat('Y-m-d', $experienceJson['start_date']));
                        $experience->setEndDate(DateTime::createFromFormat('Y-m-d', $experienceJson['start_date']));

                        $this->getUser()->getStudent()->addExperience($experience);
                        $em->persist($experience);
                    }
                }
                $application->setStatus(ApplicationStatusEnum::PENDING);
                $application->setMotivationLetter($data['application']['motivation_letter']);
                $application->setStudent($this->getUser()->getStudent());
                $offer = $offerRepository->findOneBy(['id' => $data['offer_id']]);
                $application->setOffer($offer);
                if ($data['languages']) {
                    $languages = $data['languages'];
                    foreach ($languages as $languageData) {
                        $language = $languageRepository->findOneBy(['code' => $languageData['code']]);
                        $languageLevel = match ($languageData['level']) {
                            'A1' => LanguageLevelEnum::A1,
                            'A2' => LanguageLevelEnum::A2,
                            'B1' => LanguageLevelEnum::B1,
                            'B2' => LanguageLevelEnum::B2,
                            'C1' => LanguageLevelEnum::C1,
                            'C2' => LanguageLevelEnum::C2,
                            default => throw new \InvalidArgumentException('Invalid level value'),
                        };
                        $applicationLanguage = new ApplicationLanguage();
                        $applicationLanguage->setApplication($application);
                        $applicationLanguage->setLanguage($language);
                        $applicationLanguage->setLevel($languageLevel);
                        $application->addLanguage($applicationLanguage);
                        $em->persist($applicationLanguage);
                    }
                }
                $em->persist($application);
                $em->flush();

                return new JsonResponse(['success' => true], 200);
            } else {
                return new JsonResponse(['unauthorized' => $this->getUser()->getRoles()], JsonResponse::HTTP_UNAUTHORIZED);
            }
        } catch (\Exception $e) {
            return new JsonResponse($e->getMessage(), 400);
        }
    }

    public function addFile(string $fileType, string $fileName, $file, $clientId)
    {
        try {
            $date = new \DateTime();
            $fileName = $date->format('Y-m-d_H-i-s') . '_' . $fileName;
            $directory = dirname($this->parameterBag->get('kernel.project_dir').'/public/uploads/'.$clientId.'/'.$fileType.'/');
            $filesystem = new Filesystem();

            if (!is_dir($directory) || !$filesystem->exists($directory)) {
                $filesystem->mkdir($directory);
            }
            $filePath = $directory . '/' . $fileName;
            $data = explode(',', $file);

            file_put_contents($filePath, base64_decode($data[0]));

            return $filePath;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
