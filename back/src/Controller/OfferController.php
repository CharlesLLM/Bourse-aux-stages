<?php

namespace App\Controller;

use App\Entity\Offer;
use App\Repository\OfferRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class OfferController extends AbstractController
{
    #[Route('/offers', name: 'app_offer_index', methods: ['GET'])]
    public function getLatestCompanies(Request $request, OfferRepository $offerRepository, SerializerInterface $serializer): JsonResponse
    {
        $type = $request->query->get('type');
        $tags = $request->query->get('tags') ? explode(',', $request->query->get('tags')) : [];
        $durations = $request->query->get('durations') ? json_decode($request->query->get('durations'), true) : [];

        $offers = $offerRepository->findByFilters($type, $tags, $durations);
        $jsonContent = $serializer->serialize($offers, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    #[Route('/offer/latest', name: 'app_latest_offers')]
    public function getLatestOffers(OfferRepository $offerRepository, SerializerInterface $serializer): JsonResponse
    {
        $offers = $offerRepository->findBy([], ['createdAt' => 'DESC'], 8);
        $jsonContent = $serializer->serialize($offers, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    #[Route('/offer/{id}', name: 'app_offer_detail')]
    public function getOfferDetail(Offer $offer, SerializerInterface $serializer): JsonResponse
    {
        $jsonContent = $serializer->serialize($offer, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
