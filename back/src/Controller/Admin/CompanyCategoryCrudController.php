<?php

namespace App\Controller\Admin;

use App\Entity\CompanyCategory;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CompanyCategoryCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return CompanyCategory::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name', 'common.name'),
        ];
    }
}
