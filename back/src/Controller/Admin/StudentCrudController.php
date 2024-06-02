<?php

namespace App\Controller\Admin;

use App\Entity\Student;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class StudentCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Student::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            AssociationField::new('user', 'common.user'),
            TextField::new('address', 'common.address'),
            TextField::new('postalCode', 'common.postal_code'),
            TextField::new('city', 'common.city'),
            TextField::new('country', 'common.country')->hideOnIndex(),
        ];
    }
}
