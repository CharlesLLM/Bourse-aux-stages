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

class DashboardController extends AbstractController
{
    public function __construct(
        private CompanyRepository $companyRepository,
        private SerializerInterface $serializer
    ) {
    }

    #[Route('/admin/dashboard', name: 'admin_dashboard', methods: ['GET'])]
    public function dashboard(): JsonResponse
    {
        $this->getUser();
        $this->denyAccessUnlessGranted('ROLE_ADMIN');
        $admin = $this->getUser()->getCompanyAdmin();

        return new JsonResponse($this->serializer->serialize($admin, 'json', ['groups' => ['admin']]), Response::HTTP_OK, [], true);
    }
}
