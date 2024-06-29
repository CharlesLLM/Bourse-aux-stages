<?php

namespace App\Controller\Api;

use App\Entity\Company;
use App\Repository\CompanyRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\Transport\Serialization\Serializer;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/company')]
class CompanyController extends AbstractController
{
    public function __construct(
        private CompanyRepository $companyRepository,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/{slug}', name: 'admin_company', methods: ['GET'])]
    public function getCompanyAdmin(Company $company): JsonResponse
    {
        // Check if user is logged in and is an admin of the company matching the slug
        $this->getUser();
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        if (!$this->getUser()->getCompanyAdmin() || !$company->getAdmins()->contains($this->getUser()->getCompanyAdmin())) {
            return $this->json(['error' => 'You are not an admin of this company'], 403);
        }

        return new JsonResponse($this->serializer->serialize($company, 'json', ['groups' => ['company']]), Response::HTTP_OK, [], true);
    }

    #[Route('/check-siret/{siret}', name: 'admin_check_siret', methods: ['GET'])]
    public function checkSiret(string $siret): JsonResponse
    {
        if ($siret) {
            $foundCompany = $this->companyRepository->findOneBy(['siret' => $siret]);
            // Also check that the siret isn't the one of the company of the admin, not to block the admin from editing the company
            if ($foundCompany !== null && $foundCompany !== $this->getUser()->getCompanyAdmin()->getCompany()) {
                return $this->json(['error' => 'Le siret est déjà utilisé'], JsonResponse::HTTP_CONFLICT);
            }
        }

        return $this->json($siret);
    }

    #[Route('/edit/{slug}', name: 'admin_company_edit', methods: ['POST'])]
    public function edit(Company $company, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $this->getUser();
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        if (!$this->getUser()->getCompanyAdmin() || !$company->getAdmins()->contains($this->getUser()->getCompanyAdmin())) {
            return $this->json(['error' => 'You are not an admin of this company'], 403);
        }

        try {
            $data = json_decode($request->getContent(), true);

            if (\JSON_ERROR_NONE !== json_last_error()) {
                return new JsonResponse(['error' => 'Invalid JSON'], JsonResponse::HTTP_BAD_REQUEST);
            }

            if (isset($data['name'])) {
                $company->setName($data['name']);
            }
            if (isset($data['siret'])) {
                $company->setSiret($data['siret']);
            }
            if (isset($data['tags'])) {
                $company->setTags($data['tags']);
            }
            if (isset($data['category'])) {
                $company->setCategory($data['category']);
            }
            if (isset($data['address'])) {
                $company->setAddress($data['address']);
            }
            if (isset($data['additional_address'])) {
                $company->setAdditionalAddress($data['additional_address']);
            }
            if (isset($data['postal_code'])) {
                $company->setPostalCode($data['postal_code']);
            }
            if (isset($data['city'])) {
                $company->setCity($data['city']);
            }
            if (isset($data['country'])) {
                $company->setCountry($data['country']);
            }
            if (isset($data['phone'])) {
                $company->setPhone($data['phone']);
            }
            // if (isset($data['logo'])) {
            //     $company->setLogo($data['logo']);
            // }
            // if (isset($data['big_logo'])) {
            //     $company->setBigLogo($data['big_logo']);
            // }
            if (isset($data['creation_date'])) {
                $company->setCreationDate($data['creation_date']);
            }
            if (isset($data['size'])) {
                $company->setSize($data['size']);
            }
            if (isset($data['revenue'])) {
                $company->setRevenue($data['revenue']);
            }
            if (isset($data['description'])) {
                $company->setDescription($data['description']);
            }
            if (isset($data['x_link'])) {
                $company->setXLink($data['x_link']);
            }
            if (isset($data['linkedin_link'])) {
                $company->setLinkedinLink($data['linkedin_link']);
            }
            if (isset($data['facebook_link'])) {
                $company->setFacebookLink($data['facebook_link']);
            }
            if (isset($data['instagram_link'])) {
                $company->setInstagramLink($data['instagram_link']);
            }

            $entityManager->persist($company);
            $entityManager->flush();

            return $this->json(['message' => 'Company successfully edited', 200]);
        } catch (\Exception $e) {
            return $this->json($e->getMessage(), 400);
        }
    }
}
