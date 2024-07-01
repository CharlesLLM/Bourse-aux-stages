<?php

namespace App\Controller\Api;

use DateTime;
use App\Entity\Offer;
use App\Entity\Skill;
use App\Entity\User;
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
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;


class OfferController extends AbstractController
{
    public function __construct(
        private OfferRepository $offerRepository,
        private CompanyRepository $companyRepository,
        private TagRepository $tagRepository,
        private SkillRepository $skillRepository,
        private SerializerInterface $serializer,
        private EntityManagerInterface $entityManager,
        private AuthorizationCheckerInterface $authorizationChecker
    ) {
    }

    #[Route('/offer-create', name: 'app_offer_create', methods: ['POST'])]
    public function createOffer(Request $request): JsonResponse
    {
        if (!$this->authorizationChecker->isGranted('ROLE_ADMIN')) {
            return new JsonResponse(['error' => 'Access denied'], Response::HTTP_FORBIDDEN);
        }

        $data = json_decode($request->getContent(), true);

        $errors = [];

        // Step 1
        if (empty($data['name']) || strlen($data['name']) < 10) {
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
        if ($data['type'] == "INTERNSHIP") {
            $offer->setType(OfferTypeEnum::INTERNSHIP);
        } else {
            $offer->setType(OfferTypeEnum::APPRENTICESHIP);
        }
        $offer->setDescription($data['description'])
            ->setMission($data['mission'])
            ->setRequiredProfile($data['requiredProfile'])
            ->setRevenue($data['revenue'])
            ->setRemote(false)
            ->setRequiredLevel(LevelEnum::CAP)
            ->setDistance(50)
            ->setAvailablePlaces(50)
            ->setCreatedAt(new \DateTime())
            ->setEndPublicationDate(new \DateTime($data['endPublicationDate']))
            ->setStartDate(new \DateTime($data['startDate']))
            ->setEndDate(new \DateTime($data['endDate']));

        $user = $this->getUser();
        $company = $user->getCompanyAdmin()->getCompany();
        if (!$company) {
            return new JsonResponse(['error' => 'Entreprise inconnue'], Response::HTTP_BAD_REQUEST);
        }
        $offer->setCompany($company);

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
