<?php

namespace App\Controller;

use DateTime;
use App\Entity\Offer;
use App\Entity\Skill;
use App\Enum\OfferTypeEnum;
use App\Enum\LevelEnum;
use App\Repository\OfferRepository;
use App\Repository\CompanyRepository;
use App\Repository\TagRepository;
use App\Repository\SkillRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class OfferController extends AbstractController
{
    public function __construct(
        private OfferRepository $offerRepository,
        private CompanyRepository $companyRepository,
        private TagRepository $tagRepository,
        private SkillRepository $skillRepository,
        private SerializerInterface $serializer,
        private EntityManagerInterface $entityManager 
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
        $jsonContent = $this->serializer->serialize($offers, 'json', ['groups' => ['offer']]);

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
    public function getOfferDetail(Offer $offer): JsonResponse
    {
        $offerArray = $this->serializer->normalize($offer, null, ['groups' => ['offer']]);
        $offerArray['applicationsCount'] = \count($offer->getApplications());
        $jsonContent = json_encode($offerArray);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    #[Route('/offer/{id}/similar', name: 'app_offer_similar', methods: ['GET'])]
    public function getSimilarOffers(Offer $offer): JsonResponse
    {
        $offers = $this->offerRepository->findSimilar($offer);
        $jsonContent = $this->serializer->serialize($offers, 'json', ['groups' => ['offer']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    #[Route('/offer-create', name: 'app_offer_create', methods: ['POST'])]
    public function createOffer(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $errors = [];

        // Step 1
        if (empty($data['name']) || strlen($data['name']) < 50) {
            $errors['offerName'] = "Le nom de l'offre doit contenir au moins 50 caractères.";
        }

        if (empty($data['type'])) {
            $errors['offerType'] = "Veuillez sélectionner le type d'offre.";
        }

        if (!empty($data['revenue']) && !is_numeric($data['revenue'])) {
            $errors['offerPay'] = "La rémunération doit être un nombre.";
        }

        // Step 2
        if (empty($data['description']) || strlen($data['description']) < 300) {
            $errors['offerAbout'] = "Le champ A propos doit contenir au moins 300 caractères.";
        } elseif (strlen($data['description']) > 2000) {
            $errors['offerAbout'] = "Le champ A propos ne doit pas dépasser 2000 caractères.";
        }

        // Step 3
        if (empty($data['endPublicationDate'])) {
            $errors['offerPublishedDate'] = "Veuillez sélectionner une date de publication.";
        } elseif (new DateTime($data['endPublicationDate']) >= new DateTime($data['startDate'])) {
            $errors['offerPublishedDate'] = "La date de publication doit être antérieure à la date de début de l'offre.";
        }

        if (empty($data['endDate'])) {
            $errors['offerEndDate'] = "Veuillez sélectionner une date de fin de l'offre.";
        } elseif (new DateTime($data['endDate']) <= new DateTime($data['startDate'])) {
            $errors['offerEndDate'] = "La date de fin de l'offre doit être postérieure à la date de début de l'offre.";
        }

        if (empty($data['startDate'])) {
            $errors['offerStartDate'] = "Veuillez sélectionner une date de début de l'offre.";
        } elseif (!empty($data['endDate']) && new DateTime($data['startDate']) >= new DateTime($data['endDate'])) {
            $errors['offerStartDate'] = "La date de début de l'offre doit être antérieure à la date de fin de l'offre.";
        }

        if (!empty($errors)) {
            return new JsonResponse(['errors' => $errors], Response::HTTP_BAD_REQUEST);
        }

        $offer = new Offer();
        $offer->setName($data['name']);
        if ($data['type'] == "INTERNSHIP") $offer->setType(OfferTypeEnum::INTERNSHIP);
        else $offer->setType(OfferTypeEnum::APPRENTICESHIP);
        $offer->setDescription($data['description']);
        $offer->setMission($data['mission']);
        $offer->setRequiredProfile($data['requiredProfile']);
        $offer->setRevenue($data['revenue']);
        $offer->setRemote(false);
        $offer->setRequiredLevel(LevelEnum::CAP);
        $offer->setDistance(50);
        $offer->setAvailablePlaces(50);
        $offer->setCreatedAt(new \DateTime());
        $offer->setEndPublicationDate(new \DateTime($data['endPublicationDate']));
        $offer->setStartDate(new \DateTime($data['startDate']));
        $offer->setEndDate(new \DateTime($data['endDate']));
        $offer->setCompany($this->companyRepository->find("1ef36dd5-fb27-628a-901f-dd4a639cc80f"));

        if (isset($data['profiles']) && is_array($data['profiles'])) {
            foreach ($data['profiles'] as $profileId) {
                $profile = $this->tagRepository->find($profileId);
                if ($profile) {
                    $offer->addTag($profile);
                }
            }
        }
    
        if (isset($data['profiles']) && is_array($data['profiles'])) {
            foreach ($data['skills'] as $skillName) {
                $skill = new Skill();
                $skill->setName($skillName);
                $this->entityManager->persist($skill);
                $offer->addSkill($skill);
            }
        }

        $this->entityManager->persist($offer);
        $this->entityManager->flush();
        
        $jsonContent = $this->serializer->serialize($offer, 'json', ['groups' => ['offer']]);
        return new JsonResponse($jsonContent, Response::HTTP_CREATED, [], true);
    }
}