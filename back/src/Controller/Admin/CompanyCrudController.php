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
            SlugField::new('slug', 'common.slug')->setTargetFieldName('name')->hideOnIndex(),
            TextField::new('siret', 'company.siret')->hideOnIndex(),
            IntegerField::new('size', 'company.size')->hideOnIndex(),
            TextField::new('summary', 'company.summary')->hideOnIndex(),
            TextareaField::new('description', 'common.description')->hideOnIndex(),
            TextField::new('address', 'common.address')->hideOnIndex(),
            TextField::new('additionalAddress', 'company.additional_address')->hideOnIndex(),
            TextField::new('postalCode', 'common.postal_code'),
            TextField::new('city', 'common.city'),
            CountryField::new('country', 'common.country')->hideOnIndex(),
            TextField::new('websiteLink', 'company.website')->hideOnIndex(),
            TextField::new('websiteLinkLabel', 'company.website_label')->hideOnIndex(),
            TextField::new('xLink', 'company.x_link')->hideOnIndex(),
            TextField::new('linkedinLink', 'company.linkedin_link')->hideOnIndex(),
            AssociationField::new('category', 'common.category'),
            AssociationField::new('tags', 'company.tags')->hideOnIndex(),
            AssociationField::new('offers', 'company.offers')->hideOnForm(),
            BooleanField::new('enabled', 'common.enabled'),
            ImageField::new('logo', 'company.logo')
                ->setBasePath('/uploads/company/')
                ->setUploadDir('public/uploads/company/')
                ->setUploadedFileNamePattern('[slug]-[uuid].[extension]')
                ->setRequired(false),
        ];
    }
}
