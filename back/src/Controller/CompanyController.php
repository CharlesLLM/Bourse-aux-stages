<?php

namespace App\Controller;

use App\Repository\CompanyRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/companies')]
class CompanyController extends AbstractController
{
    #[Route('/', name: 'app_companies_index', methods: ['GET'])]
    public function getLatestCompanies(Request $request, CompanyRepository $companyRepository, SerializerInterface $serializer): JsonResponse
    {
        $tagsString = $request->query->get('tags');
        $tags = $tagsString ? explode(',', $tagsString) : [];

        $companies = $companyRepository->findByFilters($tags);
        $jsonContent = $serializer->serialize($companies, 'json', ['groups' => ['company']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
