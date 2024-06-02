<?php

namespace App\Tests\Factory;

use App\Entity\Offer;
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
            'endDate' => self::faker()->dateTime(),
            'name' => self::faker()->randomElement(OffersNameEnum::cases())->value,
            'promoteStatus' => self::faker()->randomElement(PromoteStatusEnum::cases()),
            'remote' => self::faker()->boolean(),
            'revenue' => self::faker()->randomFloat(),
            'startDate' => self::faker()->dateTime(),
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
