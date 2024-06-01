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
        $tags = $request->query->get('tags') ? explode(',', $request->query->get('tags')) : [];
        $categories = $request->query->get('categories') ? explode(',', $request->query->get('categories')) : [];

        $companies = $companyRepository->findByFilters($tags, $categories);
        $jsonContent = $serializer->serialize($companies, 'json', ['groups' => ['company']]);

        return new JsonResponse($jsonContent, Response::HTTP_OK, [], true);
    }
}
