<?php

namespace App\Enum;

use Symfony\Contracts\Translation\TranslatorInterface;

enum OfferTypeEnum: string
{
    case INTERNSHIP = 'stage';
    case APPRENTICESHIP = 'alternance';

    public function trans(TranslatorInterface $translator): string
    {
        return $translator->trans(match ($this) {
            self::INTERNSHIP => 'offer.type.internship',
            self::APPRENTICESHIP => 'offer.type.apprenticeship',
        }, domain: 'messages');
    }
}
