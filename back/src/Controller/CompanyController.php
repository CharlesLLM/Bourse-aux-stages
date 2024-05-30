<?php

namespace App\Controller;

use App\Repository\CompanyRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/companies')]
class CompanyController extends AbstractController
{
    #[Route('/', name: 'app_companies_index', methods: ['GET'])]
    public function getLatestCompanies(CompanyRepository $companyRepository, SerializerInterface $serializer): JsonResponse
    {
        $companies = $companyRepository->findAll();
        $jsonContent = $serializer->serialize($companies, 'json', ['groups' => ['company']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
