<?php

namespace App\Controller;

use App\Entity\Admin;
use App\Entity\Company;
use App\Entity\Student;
use App\Entity\User;
use App\Enum\GenderEnum;
use App\Repository\AdminRepository;
use App\Repository\LanguageRepository;
use App\Repository\StudentRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Csrf\TokenStorage\TokenStorageInterface;
use Symfony\Component\Serializer\SerializerInterface;

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

    #[Route(path: '/user/check-email/{email}', name: 'check-email', methods: ['GET'])]
    public function checkEmail(UserRepository $userRepository, string $email = ''): JsonResponse
    {
        if ($email) {
            $emailExists = null !== $userRepository->findOneBy(['email' => $email]);
            if ($emailExists) {
                return $this->json(['error' => 'L\'adresse email est déjà utilisée'], JsonResponse::HTTP_CONFLICT);
            }
        }

        return $this->json('');
    }

    #[Route(path: '/user/register', name: 'register', methods: ['POST'])]
    public function register(Request $request, LanguageRepository $languageRepository, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);

            if (\JSON_ERROR_NONE !== json_last_error()) {
                return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
            }
            $language = $languageRepository->findOneBy(['code' => $data['language']]);

            $gender = match ($data['gender']) {
                'male' => GenderEnum::MALE,
                'female' => GenderEnum::FEMALE,
                'other' => GenderEnum::OTHER,
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
                if ('admin' === $data['role']) {
                    $admin = new Admin();
                    $company = new Company();
                    $user->setRoles(['ROLE_ADMIN']);
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
                    if (isset($data['admin']['company']['additional_address'])) {
                        $company->setAdditionalAddress($data['admin']['company']['additional_address']);
                    }
                    $admin->setCompany($company);
                    $user->setCompanyAdmin($admin);
                } elseif ('student' === $data['role']) {
                    $student = new Student();
                    $user->setRoles(['ROLE_STUDENT']);
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
                $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
                $user->setPassword($hashedPassword);
            }

            $em->persist($user);
            $em->flush();

            return $this->json(['message' => 'User registered successfully', 200]);
        } catch (\Exception $e) {
            return $this->json($e->getMessage(), 400);
        }
    }

    #[Route(path: '/user/login', name: 'login', methods: ['POST'])]
    public function login(Request $request, UserRepository $userRepository, JWTTokenManagerInterface $jwtManager, UserPasswordHasherInterface $passwordHasher, TokenStorageInterface $storage): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $password = $data['password'] ?? null;

        if (!$email || !$password) {
            return new JsonResponse(['error' => 'Les identifiants sont incorrects'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $user = $userRepository->findOneBy(['email' => $email]);
        if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
            return new JsonResponse(['error' => 'Les identifiants sont incorrects'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $token = $jwtManager->create($user);

        return new JsonResponse(['token' => $token], JsonResponse::HTTP_OK);
    }

    #[Route(path: 'api/user/get', name: 'get_user', methods: ['POST'])]
    public function getUserAction(SerializerInterface $serializer, StudentRepository $studentRepository, AdminRepository $adminRepository): JsonResponse
    {
        try {
            $user = $this->getUser();
            $group = '';

            if ($this->isGranted('ROLE_STUDENT')) {
//                $student = $studentRepository->findOneBy(['user' => $user]);
//                $user->setStudent($student);
                $group = 'user_student';
            }
            if ($this->isGranted('ROLE_ADMIN')) {
//                $admin = $adminRepository->findOneBy(['user' => $user]);
//                $user->setCompanyAdmin($admin);
                $group = 'user_admin';
            }
            return new JsonResponse($serializer->serialize($user, 'json', ['groups' => [$group]]), JsonResponse::HTTP_OK, [], true);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_UNAUTHORIZED);
        }
    }
}
