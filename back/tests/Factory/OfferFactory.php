<?php

namespace App\Tests\Factory;

use App\Entity\Offer;
use App\Enum\LevelEnum;
use App\Enum\OfferNameEnum;
use App\Enum\OfferTypeEnum;
use App\Enum\PromoteStatusEnum;
use Zenstruck\Foundry\ModelFactory;

final class OfferFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'availablePlaces' => self::faker()->numberBetween(0, 100),
            'company' => CompanyFactory::new(),
            'description' => self::faker()->text(),
            'distance' => self::faker()->numberBetween(0, 100),
            'endDate' => self::faker()->dateTimeBetween('+4 months', '+16 months'),
            'endPublicationDate' => self::faker()->dateTimeBetween('+3 days', '+2 month'),
            'name' => self::faker()->randomElement(OfferNameEnum::cases())->value,
            'promoteStatus' => self::faker()->randomElement(PromoteStatusEnum::cases()),
            'remote' => self::faker()->boolean(),
            'requiredLevel' => self::faker()->randomElement(LevelEnum::cases()),
            'revenue' => self::faker()->randomFloat(),
            'skills' => SkillFactory::new()->many(5),
            'startDate' => self::faker()->dateTimeBetween('+2 months', '+4 months'),
            'type' => self::faker()->randomElement(OfferTypeEnum::cases()),
        ];
    }

    protected function initialize(): self
    {
        return $this->afterInstantiate(function(Offer $offer): void {
            // If the offer is an internship, then we set a shorter duration
            if ($offer->getType() === OfferTypeEnum::INTERNSHIP) {
                $offer->setEndDate(self::faker()->dateTimeBetween('+4 months', '+5 months'));
            }
        });
    }

    protected static function getClass(): string
    {
        return Offer::class;
    }
}
