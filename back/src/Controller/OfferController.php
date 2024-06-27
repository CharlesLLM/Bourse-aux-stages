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
use Symfony\Polyfill\Intl\Idn\Info;

class OfferController extends AbstractController
{
    public function __construct(
        private OfferRepository $offerRepository,
        private SerializerInterface $serializer,
    ) {
    }

    #[Route('/offers', name: 'app_offer_index', methods: ['GET'])]
    public function getLatestCompanies(Request $request): JsonResponse
    {
        $type = $request->query->get('type');
        $tags = $request->query->get('tags') ? explode(',', $request->query->get('tags')) : [];
        $levels = $request->query->get('levels') ? explode(',', $request->query->get('levels')) : [];
        $distance = $request->query->get('distance') ?? null;
        $durations = $request->query->get('durations') ? json_decode($request->query->get('durations'), true) : [];
        $companies = $request->query->get('companies') ? explode(',', $request->query->get('companies')) : [];
        $activeOffers = !$request->query->has('noActiveOffers');
        $closedOffers = $request->query->has('closedOffers');
        $offers = $this->offerRepository->findByFilters($type, $tags, $levels, $durations, $distance, $companies, $activeOffers, $closedOffers);
        $jsonContent = $serializer->serialize($offers, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    #[Route('/offers/count', name: 'app_offer_count', methods: ['GET'])]
    public function getOffersCount(): JsonResponse
    {
        $counts = $this->offerRepository->countByType();
        $counts = json_encode($counts);

        return new JsonResponse($counts, Response::HTTP_OK, [], true);
    }

    #[Route('/offer/latest', name: 'app_latest_offers')]
    public function getLatestOffers(): JsonResponse
    {
        $offers = $this->offerRepository->findBy([], ['createdAt' => 'DESC'], 8);
        $jsonContent = $this->serializer->serialize($offers, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    #[Route('/offer/{id}', name: 'app_offer_detail')]
    public function getOfferDetail(Offer $offer, SerializerInterface $serializer): JsonResponse
    {
        $jsonContent = $serializer->serialize($offer, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    #[Route('/offers/{company}', name: 'app_offer_company')]
    public function getOffersCompany(Request $request, SerializerInterface $serializer): JsonResponse
    {
        $type = $request->query->get('type');
        $tags = $request->query->get('tags') ? explode(',', $request->query->get('tags')) : [];
        $levels = $request->query->get('levels') ? explode(',', $request->query->get('levels')) : [];
        $distance = $request->query->get('distance') ?? null;
        $durations = $request->query->get('durations') ? json_decode($request->query->get('durations'), true) : [];

        $offers = $this->offerRepository->findByFilters($type, $tags, $levels, $durations, $distance);
        $jsonContent = $serializer->serialize($offers, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
