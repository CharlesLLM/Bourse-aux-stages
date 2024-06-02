<?php

namespace App\Controller;

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
}
