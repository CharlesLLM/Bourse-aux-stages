<?php

namespace App\Controller;

use App\Entity\Tag;
use App\Repository\TagRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class TagController extends AbstractController
{
    public function __construct(
        private TagRepository $tagRepository,
        private SerializerInterface $serializer
    ){
    }

    #[Route('/tags', name: 'app_tag_index', methods: ['GET'])]
    public function getAllTags(SerializerInterface $serializer): JsonResponse
    {
        $tags = $this->tagRepository->findAll();

        // Serialize tags to JSON using Symfony Serializer component
        $data = $serializer->serialize($tags, 'json', ['groups' => ['companies', 'company', 'offer']]);

        return new JsonResponse($data, 200, [], true);
    }
}
