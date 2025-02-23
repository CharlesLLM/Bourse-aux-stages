<?php

namespace App\Controller\Admin;

use App\Entity\Company;
use Doctrine\ORM\EntityManagerInterface;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CollectionField;
use EasyCorp\Bundle\EasyAdminBundle\Field\CountryField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\SlugField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TelephoneField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;

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
            DateField::new('creationDate', 'company.creation_date')->hideOnIndex(),
            IntegerField::new('size', 'company.size')->hideOnIndex(),
            IntegerField::new('revenue', 'company.revenue')->hideOnIndex(),
            TextField::new('summary', 'company.summary')->hideOnIndex(),
            TextareaField::new('description', 'common.description')->hideOnIndex(),
            TextField::new('address', 'common.address')->hideOnIndex(),
            TextField::new('additionalAddress', 'company.additional_address')->hideOnIndex(),
            TextField::new('postalCode', 'common.postal_code'),
            TextField::new('city', 'common.city'),
            CountryField::new('country', 'common.country')->hideOnIndex(),
            TelephoneField::new('phone', 'common.phone')->hideOnIndex(),
            TextField::new('websiteLink', 'company.website')->hideOnIndex(),
            TextField::new('websiteLinkLabel', 'company.website_label')->hideOnIndex(),
            TextField::new('xLink', 'company.x_link')->hideOnIndex(),
            TextField::new('linkedinLink', 'company.linkedin_link')->hideOnIndex(),
            // TODO : Remove
            NumberField::new('distance', 'offer.distance')->hideOnIndex(),
            AssociationField::new('category', 'common.category'),
            AssociationField::new('tags', 'common.tags')->hideOnIndex(),
            AssociationField::new('offers', 'company.offers')->hideOnForm(),
            BooleanField::new('enabled', 'common.enabled'),
            ImageField::new('logo', 'company.logo')
                ->setBasePath('/uploads/company/')
                ->setUploadDir('public/uploads/company/')
                ->setUploadedFileNamePattern('[slug]-[uuid].[extension]')
                ->setRequired(false),
            ImageField::new('bigLogo', 'company.big_logo')
                ->setBasePath('/uploads/company/')
                ->setUploadDir('public/uploads/company/')
                ->setUploadedFileNamePattern('[slug]-[uuid].[extension]')
                ->setRequired(false)
                ->hideOnIndex(),

            CollectionField::new('images')
                ->setEntryType(FileType::class)
                ->setFormTypeOptions([
                    'entry_options' => [
                        'label' => false,
                        'required' => false,
                        'data_class' => null,
                    ],
                    'allow_add' => true,
                    'allow_delete' => true,
                    'by_reference' => false,
                ])
                ->setLabel('Images')
                ->setRequired(false),
        ];
    }

    public function createEntity(string $entityFqcn)
    {
        $company = new Company();

        return $company;
    }

    public function persistEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        $this->handleFileUpload($entityInstance);
        parent::persistEntity($entityManager, $entityInstance);
    }

    public function updateEntity(EntityManagerInterface $entityManager, $entityInstance): void
    {
        $this->handleFileUpload($entityInstance);
        parent::updateEntity($entityManager, $entityInstance);
    }

    private function handleFileUpload($entityInstance): void
    {
        /** @var Company $company */
        $company = $entityInstance;

        $images = $company->getImages();
        $updatedImages = [];

        foreach ($images as $key => $image) {
            if ($image instanceof UploadedFile) {
                $newFilename = uniqid().'.'.$image->guessExtension();

                try {
                    $image->move(
                        $this->getParameter('kernel.project_dir').'/public/uploads/company',
                        $newFilename
                    );
                } catch (FileException $e) {
                    // Handle exception if something happens during file upload
                }

                $updatedImages[] = $newFilename;
            } else {
                $updatedImages[] = $image;
            }
        }

        $company->setImages($updatedImages);
    }
}
