<?php

namespace App\Controller\Api;

use App\Entity\Language;
use App\Enum\GenderEnum;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

#[Route(path: '/user')]
class UserController extends AbstractController
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    #[Route(path: '/check-email/{email}', name: 'api_check_email', methods: ['GET'])]
    public function checkEmail(string $email = ''): JsonResponse
    {
        if ($email) {
            $foundUser = $this->userRepository->findOneBy(['email' => $email]);
            if (null !== $foundUser && $foundUser->getEmail() !== $this->getUser()->getEmail()) {
                return $this->json(['error' => 'L\'adresse email est déjà utilisée'], JsonResponse::HTTP_CONFLICT);
            }
        }

        return $this->json('');
    }

    #[Route(path: '/edit', name: 'api_user_edit', methods: ['POST'])]
    public function edit(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (\JSON_ERROR_NONE !== json_last_error()) {
            return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $language = $entityManager->getRepository(Language::class)->findOneBy(['code' => $data['language']]);

        try {
            $user = $this->getUser();
            $user->setEmail($data['email'])
                ->setFirstname($data['firstName'])
                ->setLastname($data['lastName'])
                ->setGender(GenderEnum::from($data['gender']))
                ->setPhone($data['phone'])
                ->setBirthdate(new \DateTime($data['birth_date']))
                ->setLanguage($language);

            if (isset($data['password']) && isset($data['confirm_password']) && $data['password'] === $data['confirm_password']) {
                $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);
                $user->setPassword($hashedPassword);
            }

            $entityManager->flush();
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_BAD_REQUEST);
        }

        return $this->json('success');
    }
}
