<?php

namespace App\Controller\Admin;

use App\Entity\Company;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CountryField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
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
            SlugField::new('slug', 'common.slug')->setTargetFieldName('name'),
            TextField::new('siret', 'company.siret'),
            IntegerField::new('size', 'company.size'),
            TextField::new('summary', 'company.summary'),
            TextareaField::new('description', 'common.description'),
            TextField::new('address', 'common.address'),
            TextField::new('additionalAddress', 'company.additional_address'),
            TextField::new('postalCode', 'common.postal_code'),
            TextField::new('city', 'common.city'),
            CountryField::new('country', 'common.country'),
            TextField::new('xLink', 'company.x_link'),
            TextField::new('linkedinLink', 'company.linkedin_link'),
            AssociationField::new('category', 'common.category'),
            AssociationField::new('tags', 'company.tags'),
            BooleanField::new('enabled', 'common.enabled'),
            ImageField::new('logo', 'company.logo')
                ->setBasePath('/uploads/company/')
                ->setUploadDir('public/uploads/company/')
                ->setUploadedFileNamePattern('[slug]-[uuid].[extension]')
                ->setRequired(false),
        ];
    }
}
