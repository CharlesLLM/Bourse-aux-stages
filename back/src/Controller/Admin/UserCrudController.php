<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\EmailField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            ChoiceField::new('gender', 'user.gender'),
            TextField::new('firstName', 'common.first_name'),
            TextField::new('lastName', 'common.last_name'),
            EmailField::new('email', 'common.email')->hideOnIndex(),
            TextField::new('phone', 'common.phone')->hideOnIndex(),
            BooleanField::new('enabled', 'common.enabled'),
        ];
    }
}
