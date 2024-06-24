<?php

namespace App\Tests\Factory;

use App\Entity\Company;
use Faker\Factory;
use Zenstruck\Foundry\ModelFactory;

final class CompanyFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        $faker = Factory::create('fr_FR');

        return [
            'address' => $faker->address(),
            'category' => CompanyCategoryFactory::new(),
            'city' => $faker->city(),
            'country' => 'FR',
            'description' => $faker->sentences(5, true),
            'distance' => $faker->numberBetween(0, 100),
            'enabled' => $faker->boolean(),
            'name' => $faker->unique()->company(),
            'postalCode' => $faker->postcode(),
            'siret' => $faker->siret(),
            'size' => $faker->numberBetween(1, 1200),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Company::class;
    }
}
