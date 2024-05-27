<?php

namespace App\Controller;

use App\Entity\Request;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class RequestController extends AbstractController
{
    #[Route('/request/latest', name: 'latest_requests')]
    public function getLatestOffers(EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        $requests = $entityManager->getRepository(Request::class)->findBy([], ['createdAt' => 'DESC'], 8);
        $jsonContent = $serializer->serialize($requests, 'json', ['groups' => ['request']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
