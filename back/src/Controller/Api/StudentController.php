<?php

namespace App\Controller\Api;

use App\Entity\ApplicationLanguage;
use App\Entity\Experience;
use App\Entity\Formation;
use App\Entity\Language;
use App\Entity\Skill;
use App\Enum\GenderEnum;
use App\Enum\LanguageLevelEnum;
use App\Enum\LevelEnum;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route(path: '/student')]
class StudentController extends AbstractController
{
    public function __construct(
        private SerializerInterface $serializer,
        private ParameterBagInterface $parameterBag
    ) {
    }

    #[Route('/', name: 'admin_student', methods: ['GET'])]
    public function getStudent(): JsonResponse
    {
        $this->getUser();
        $this->denyAccessUnlessGranted('ROLE_STUDENT');
        if (!$this->getUser()->getStudent()) {
            return $this->json(['error' => 'You are not a student'], 403);
        }

        return new JsonResponse($this->serializer->serialize($this->getUser()->getStudent(), 'json', ['groups' => ['student']]), Response::HTTP_OK, [], true);
    }

    #[Route('/formation', name: 'admin_student_formation', methods: ['GET'])]
    public function getStudentFormation(): JsonResponse
    {
        $this->getUser();
        $this->denyAccessUnlessGranted('ROLE_STUDENT');
        if (!$this->getUser()->getStudent()) {
            return $this->json(['error' => 'You are not a student'], 403);
        }
        $formation = $this->getUser()->getStudent()->getFormations()->first();

        return new JsonResponse($this->serializer->serialize($formation, 'json', ['groups' => ['student']]), Response::HTTP_OK, [], true);
    }

    #[Route(path: '/edit', name: 'api_student_edit', methods: ['POST'])]
    public function edit(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (\JSON_ERROR_NONE !== json_last_error()) {
            return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        try {
            $user = $this->getUser();
            if (!empty($data['email'])) {
                $user->setEmail($data['email']);
            }
            if (!empty($data['firstName'])) {
                $user->setFirstName($data['firstName']);
            }
            if (!empty($data['lastName'])) {
                $user->setLastname($data['lastName']);
            }
            if (!empty($data['gender'])) {
                $user->setGender(GenderEnum::from($data['gender']));
            }
            if (!empty($data['phone'])) {
                $user->setPhone($data['phone']);
            }
            if (!empty($data['birth_date'])) {
                $user->setBirthdate(new \DateTime($data['birth_date']));
            }
            if (!empty($data['language'])) {
                $language = $entityManager->getRepository(Language::class)->findOneBy(['code' => $data['language']]);
                $user->setLanguage($language);
            }

            if (isset($data['password']) && isset($data['confirm_password']) && !empty($data['password']) && $data['password'] === $data['confirm_password']) {
                $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
                $user->setPassword($hashedPassword);
            }

            if (isset($data['pic']) && isset($data['pic_name'])) {
                $path = $this->addFile('pic', $data['pic_name'], $data['pic'], $user->getId());
                $user->setPic($path);
            }

            $student = $user->getStudent();
            dd($student, $data);
            if (!empty($data['address'])) {
                $student->setAddress($data['address']);
            }
            if (!empty($data['additional_address'])) {
                $student->setAdditionalAddress($data['additional_address']);
            }
            if (!empty($data['city'])) {
                $student->setCity($data['city']);
            }
            if (!empty($data['postal_code'])) {
                $student->setPostalCode($data['postal_code']);
            }
            if (!empty($data['student']['linkedin_link'])) {
                $student->setLinkedinLink($data['student']['linkedin_link']);
            }
            if (!empty($data['student']['personal_website'])) {
                $student->setPersonalWebsite($data['student']['personal_website']);
            }
            if (!empty($data['student']['disability'])) {
                $student->setDisability($data['student']['disability']);
            }
            if (!empty($data['student']['driving_licence'])) {
                $student->setDrivingLicence($data['student']['driving_licence']);
            }

            $formation = $student->getFormations()->first() ?? null;
            if (!$formation) {
                $formation = new Formation();
                $formation->setStudent($student);
            }

            if (!empty($data['student']['formation']['name'])) {
                $formation->setName($data['student']['formation']['name']);
            }
            if (!empty($data['student']['formation']['level'])) {
                $grade = match ($data['student']['formation']['level']) {
                    'CAP' => LevelEnum::CAP,
                    'BAC' => LevelEnum::BAC,
                    'BAC_2' => LevelEnum::BAC_2,
                    'BAC_3' => LevelEnum::BAC_3,
                    'BAC_5' => LevelEnum::BAC_5,
                    'BAC_8' => LevelEnum::BAC_8,
                    default => throw new \InvalidArgumentException('Invalid level value'),
                };
                $formation->setLevel($grade);
            }
            if (!empty($data['student']['formation']['school_name'])) {
                $formation->setSchoolName($data['student']['formation']['school_name']);
            }

            $entityManager->persist($formation);
            $entityManager->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }

        return $this->json('success');
    }

    public function addFile(string $fileType, string $fileName, $file, $userId): string
    {
        try {
            $date = new \DateTime();
            $fileName = $date->format('Y-m-d_H-i-s').'_'.$fileName;
            $directory = \dirname($this->parameterBag->get('kernel.project_dir').'/public/uploads/'.$userId.'/'.$fileType.'/');
            $filesystem = new Filesystem();

            if (!is_dir($directory) || !$filesystem->exists($directory)) {
                $filesystem->mkdir($directory);
            }
            $filePath = $directory.'/'.$fileName;
            $data = explode(',', $file);

            file_put_contents($filePath, base64_decode($data[0], true));

            return $filePath;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }
    }
}
