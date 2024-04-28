<?php

namespace App\Controller\Admin;

use App\Entity\Company;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CompanyCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Company::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name', 'common.name'),
            TextField::new('siret', 'company.siret'),
            TextField::new('xLink', 'company.x_link'),
            TextField::new('linkedinLink', 'company.linkedin_link'),
            BooleanField::new('enabled', 'common.enabled'),
        ];
    }
}
