<?php

namespace App\Controller;

use App\Entity\Offer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class OfferController extends AbstractController
{
    #[Route('/offer/latest', name: 'latest_offers')]
    public function getLatestOffers(EntityManagerInterface $entityManager, SerializerInterface $serializer): Response
    {
        $offers = $entityManager->getRepository(Offer::class)->findBy([], ['createdAt' => 'DESC'], 8);
        $jsonContent = $serializer->serialize($offers, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
