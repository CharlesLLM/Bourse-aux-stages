<?php

namespace App\Controller;

use App\Entity\Company;
use App\Repository\CompanyRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class CompanyController extends AbstractController
{
    #[Route('/companies', name: 'app_company_index', methods: ['GET'])]
    public function getLatestCompanies(Request $request, CompanyRepository $companyRepository, SerializerInterface $serializer): JsonResponse
    {
        $tags = $request->query->get('tags') ? explode(',', $request->query->get('tags')) : [];
        $categories = $request->query->get('categories') ? explode(',', $request->query->get('categories')) : [];
        $sizes = $request->query->get('sizes') ? json_decode($request->query->get('sizes'), true) : [];
        $distance = $request->query->get('distance') ?? null;

        $companies = $companyRepository->findByFilters($tags, $categories, $sizes, $distance);
        $jsonContent = $serializer->serialize($companies, 'json', ['groups' => ['companies']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }

    #[Route('/company/{slug}', name: 'app_company_view', methods: ['GET'])]
    public function company(Company $company, SerializerInterface $serializer): JsonResponse
    {
        return new JsonResponse($serializer->serialize($company, 'json', ['groups' => ['company']]), Response::HTTP_OK, [], true);
    }

    #[Route(path: '/company/check-siret/{siret}', name: 'check-siret', methods: ['GET'])]
    public function checkSiret( CompanyRepository $companyRepository, string $siret = ''): JsonResponse {
        if ($siret) {
            $emailExists = $companyRepository->findOneBy(['siret' => $siret]) !== null;
            if ($emailExists) {
                return $this->json(['error' => 'Le siret est déjà utilisé'], JsonResponse::HTTP_CONFLICT);
            }
        }
        return $this->json($siret);
    }
    #[Route('/companies/top', name: 'app_company_top', methods: ['GET'])]
    public function getCompaniesWithMostOffers(CompanyRepository $companyRepository, SerializerInterface $serializer): JsonResponse
    {
        $companies = $companyRepository->findCompaniesWithMostOffers();
        $jsonContent = $serializer->serialize($companies, 'json', ['groups' => ['companies']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
