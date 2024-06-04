<?php

namespace App\Tests\Factory;

use App\Entity\Offer;
use App\Enum\LevelEnum;
use App\Enum\OffersNameEnum;
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
            'endDate' => self::faker()->dateTimeBetween('+4 months', '+16 months'),
            'endPublicationDate' => self::faker()->dateTimeBetween('+3 days', '+2 month'),
            'name' => self::faker()->randomElement(OffersNameEnum::cases())->value,
            'promoteStatus' => self::faker()->randomElement(PromoteStatusEnum::cases()),
            'remote' => self::faker()->boolean(),
            'requiredLevel' => self::faker()->randomElement(LevelEnum::cases()),
            'revenue' => self::faker()->randomFloat(),
            'startDate' => self::faker()->dateTimeBetween('+2 months', '+4 months'),
            'type' => self::faker()->randomElement(OfferTypeEnum::cases()),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Offer::class;
    }
}
