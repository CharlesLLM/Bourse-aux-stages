<?php

namespace App\Controller;

use App\Repository\LanguageRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

class LanguageController extends AbstractController
{
    #[Route('/languages', name: 'language_index')]
    public function index(LanguageRepository $languageRepository, SerializerInterface $serializer): Response
    {
        $languages = $languageRepository->findBy([], ['name' => 'ASC']);
        $languagesContent = $serializer->serialize($languages, 'json');

        return new JsonResponse($languagesContent, Response::HTTP_OK, [], true);
    }
}
