<?php

namespace App\Controller\Api;

use App\Entity\Language;
use App\Enum\GenderEnum;
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

    #[Route(path: '/edit', name: 'api_student_edit', methods: ['POST'])]
    public function edit(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        if (\JSON_ERROR_NONE !== json_last_error()) {
            return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $language = $entityManager->getRepository(Language::class)->findOneBy(['code' => $data['language']]);

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
            if (!empty($data['linkedin_link'])) {
                $student->setLinkedinLink($data['linkedin_link']);
            }
            if (!empty($data['personal_website'])) {
                $student->setPersonalWebsite($data['personal_website']);
            }
            if (!empty($data['disability'])) {
                $student->setDisability($data['disability']);
            }
            if (!empty($data['driving_licence'])) {
                $student->setDrivingLicence($data['driving_licence']);
            }

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
