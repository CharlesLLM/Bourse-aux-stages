<?php

namespace App\Controller\Admin;

use App\Entity\Offer;
use App\Enum\OfferTypeEnum;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class OfferCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Offer::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('name', 'common.name'),
            ChoiceField::new('type', 'offer.type'),
            TextareaField::new('description', 'common.description'),
            MoneyField::new('revenue', 'offer.revenue')->setCurrency('EUR'),
            BooleanField::new('remote', 'offer.remote'),
            NumberField::new('availablePlaces', 'offer.available_places'),
            AssociationField::new('company', 'common.company'),
        ];
    }

    // private function getTranslatedOfferTypes(): array
    // {
    //     $translatedOffers = [];

    //     foreach (OfferTypeEnum::cases() as $case) {
    //         $translatedOffers[$case->name] = $case->trans($this->translator);
    //     }

    //     return $translatedOffers;
    // }
}
