<?php

namespace App\Controller;

use App\Entity\Admin;
use App\Entity\Company;
use App\Entity\Student;
use App\Entity\User;
use App\Enum\GenderEnum;
use App\Repository\LanguageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route(path: '/user/upload-pic', name: 'upload_pic', methods: ['POST'])]
    public function upload(Request $request): JsonResponse
    {
        $uploadedFile = $request->files->get('file');
        $userId = $request->request->get('userId');
        $userDirectory = $this->getParameter('upload_directory') . '/' . $userId;
        if (!file_exists($userDirectory)) {
            mkdir($userDirectory, 0777, true);
        }

        $uploadedFile->move($userDirectory, $uploadedFile->getClientOriginalName());

        return $this->json(['message' => 'File uploaded successfully']);
    }

    #[Route(path: '/user/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, LanguageRepository $languageRepository, EntityManagerInterface $em): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
            }
            $language = $languageRepository->findOneBy(['code' => $data['language']]);

            $gender = match ($data['gender']) {
                'Homme' => GenderEnum::MALE,
                'Femme' => GenderEnum::FEMALE,
                'Autre' => GenderEnum::OTHER,
                default => throw new \InvalidArgumentException('Invalid gender value'),
            };

            $user = new User();
            $user->setLastName($data['name'] ?? '');
            $user->setFirstName($data['firstname'] ?? '');
            $user->setEmail($data['email'] ?? '');
            $user->setGender($gender ?? null);
            $user->setLanguage($language ?? '');
            $user->setBirthDate(isset($data['birth_date']) ? new \DateTime($data['birth_date']) : null);
            $user->setPhone($data['phone'] ?? '');

            if (isset($data['role'])) {
                if ($data['role'] === 'admin') {
                    $admin = new Admin();
                    $company = new Company();
                    if (isset($data['admin']['company_position'])) {
                        $admin->setPosition($data['admin']['company_position']);
                    }
                    if (isset($data['admin']['company']['city'])) {
                        $company->setCity($data['admin']['company']['city']);
                    }
                    if (isset($data['admin']['company']['country'])) {
                        $company->setCountry($data['admin']['company']['country']);
                    }
                    if (isset($data['admin']['company']['phone'])) {
                        $company->setPhone($data['admin']['company']['phone']);
                    }
                    if (isset($data['admin']['company']['name'])) {
                        $company->setName($data['admin']['company']['name']);
                    }
                    if (isset($data['admin']['company']['address'])) {
                        $company->setAddress($data['admin']['company']['address']);
                    }
                    if (isset($data['admin']['company']['postal_code'])) {
                        $company->setPostalCode($data['admin']['company']['postal_code']);
                    }
                    if (isset($data['admin']['company']['siret'])) {
                        $company->setSiret($data['admin']['company']['siret']);
                    }
                    if (isset($data['admin']['company']['second_address'])) {
                        $company->setSecondAddress($data['admin']['company']['second_address']);
                    }
                    $admin->setCompany($company);
                    $user->setCompanyAdmin($admin);
                } elseif ($data['role'] === 'student') {
                    $student = new Student();
                    if (isset($data['student']['address'])) {
                        $student->setAddress($data['student']['address']);
                    }
                    if (isset($data['student']['city'])) {
                        $student->setCity($data['student']['city']);
                    }
                    if (isset($data['student']['country'])) {
                        $student->setCountry($data['student']['country']);
                    }
                    if (isset($data['student']['postal_code'])) {
                        $student->setPostalCode($data['student']['postal_code']);
                    }
                    $user->setStudent($student);
                }
            }

            if (isset($data['password']) && isset($data['confirm_password']) && $data['password'] === $data['confirm_password']) {
                $user->setPassword(password_hash($data['password'], PASSWORD_DEFAULT));
            }

            $em->persist($user);
            $em->flush();

            return $this->json(['message' => 'User registered successfully', 200]);

        } catch (\Exception $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
}
