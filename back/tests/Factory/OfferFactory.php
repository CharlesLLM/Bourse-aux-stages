<?php

namespace App\Tests\Factory;

use App\Entity\Offer;
use App\Enum\LevelEnum;
use App\Enum\OfferNameEnum;
use App\Enum\OfferTypeEnum;
use App\Enum\PromoteStatusEnum;
use Faker\Factory;
use Zenstruck\Foundry\ModelFactory;

final class OfferFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        $faker = Factory::create('fr_FR');

        return [
            'availablePlaces' => $faker->numberBetween(0, 30),
            'company' => CompanyFactory::new(),
            'description' => $faker->sentences(5, true),
            'requiredProfile' => $faker->sentences(5, true),
            'mission' => $faker->sentences(5, true),
            // TODO : Remove
            'distance' => $faker->numberBetween(0, 100),
            'endDate' => $faker->dateTimeBetween('+4 months', '+16 months'),
            'endPublicationDate' => $faker->dateTimeBetween('+3 days', '+2 month'),
            'name' => $faker->randomElement(OfferNameEnum::cases())->value,
            'promoteStatus' => $faker->randomElement(PromoteStatusEnum::cases()),
            'remote' => $faker->boolean(),
            'active' => $faker->boolean(),
            'requiredLevel' => $faker->randomElement(LevelEnum::cases()),
            'revenue' => $faker->randomFloat(2, 0, 5000),
            'skills' => SkillFactory::new()->many(5),
            'startDate' => $faker->dateTimeBetween('+2 months', '+4 months'),
            'type' => $faker->randomElement(OfferTypeEnum::cases()),
        ];
    }

    protected function initialize(): self
    {
        return $this->afterInstantiate(function(Offer $offer): void {
            // If the offer is an internship, then we set a shorter duration
            if ($offer->getType() === OfferTypeEnum::INTERNSHIP) {
                $offer->setEndDate(self::faker()->dateTimeBetween('+4 months', '+5 months'));
            }

            // Change createdAt to have previously created offers
            $offer->setCreatedAt(self::faker()->dateTimeBetween('-2 months', 'now'));
        });
    }

    protected static function getClass(): string
    {
        return Offer::class;
    }
}
