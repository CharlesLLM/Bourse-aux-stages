<?php

namespace App\Controller;

use App\Repository\ApplicationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class ApplicationController extends AbstractController
{
    #[Route('/application/get/{studentId}/{offerId}', name: 'application', methods: ['GET'])]
    public function getApplication(string $studentId, string $offerId, ApplicationRepository $applicationRepository): JsonResponse
    {
        try {
            $application = $applicationRepository->findOneBy(['student' => $studentId, 'offer' => $offerId]);
            if (!$application) {
                return new JsonResponse(['error' => 'Application not found'], 404);
            }

            return new JsonResponse('success');
        } catch (\Exception $exception) {
            return new JsonResponse(['error' => $exception->getMessage()], 400);
        }
    }
}
