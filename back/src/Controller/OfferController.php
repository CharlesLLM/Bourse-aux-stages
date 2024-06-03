<?php

namespace App\Controller;

use App\Entity\Offer;
use App\Repository\OfferRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class OfferController extends AbstractController
{
    #[Route('/offer/latest', name: 'latest_offers')]
    public function getLatestOffers(OfferRepository $offerRepository, SerializerInterface $serializer): JsonResponse
    {
        $offers = $offerRepository->findBy([], ['createdAt' => 'DESC'], 8);
        $jsonContent = $serializer->serialize($offers, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    #[Route('/offer/{id}', name: 'offer_detail')]
    public function getOfferDetail(Offer $offer, SerializerInterface $serializer): JsonResponse
    {
        $jsonContent = $serializer->serialize($offer, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
