<?php

namespace App\Controller\Api;

use App\Repository\CompanyCategoryRepository;
use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class DefaultController extends AbstractController
{
    public function __construct(
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/check-admin', name: 'admin_check_admin', methods: ['GET'])]
    public function checkAdmin(): JsonResponse
    {
        $this->getUser();
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        if (!$this->getUser()->getCompanyAdmin()) {
            return $this->json(['error' => 'You are not an admin'], 403);
        }

        return new JsonResponse($this->serializer->serialize($this->getUser()->getCompanyAdmin(), 'json', ['groups' => ['admin']]), Response::HTTP_OK, [], true);
    }

    #[Route('/tags', name: 'admin_tags', methods: ['GET'])]
    public function getTags(TagRepository $tagRepository): JsonResponse
    {
        $this->getUser();
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $tags = $tagRepository->findAll();

        return new JsonResponse($this->serializer->serialize($tags, 'json', ['groups' => ['company']]), Response::HTTP_OK, [], true);
    }

    #[Route('/categories', name: 'admin_categories', methods: ['GET'])]
    public function getCategories(CompanyCategoryRepository $companyCategoryRepository): JsonResponse
    {
        $this->getUser();
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $categories = $companyCategoryRepository->findAll();

        return new JsonResponse($this->serializer->serialize($categories, 'json', ['groups' => ['company']]), Response::HTTP_OK, [], true);
    }
}
