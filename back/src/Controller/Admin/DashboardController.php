<?php

namespace App\Controller\Admin;

use App\Entity\Admin;
use App\Entity\Company;
use App\Entity\CompanyCategory;
use App\Entity\Offer;
use App\Entity\Student;
use App\Entity\Tag;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);

        return $this->redirect($adminUrlGenerator->setController(UserCrudController::class)->generateUrl());
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Bourse aux stages - Back-office');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToCrud('Utilisateurs', 'fa-regular fa-user', User::class);
        yield MenuItem::linkToCrud('Admins', 'fa-solid fa-user-tie', Admin::class);
        yield MenuItem::linkToCrud('Étudiants', 'fa-solid fa-graduation-cap', Student::class);
        yield MenuItem::linkToCrud('Entreprises', 'fa-solid fa-building', Company::class);
        yield MenuItem::linkToCrud('Offres', 'fa-solid fa-briefcase', Offer::class);
        yield MenuItem::linkToCrud('Secteurs d\'activité', 'fa-solid fa-tag', Tag::class);
        yield MenuItem::linkToCrud('Catégories d\'entreprise', 'fa-solid fa-tags', CompanyCategory::class);
    }
}
