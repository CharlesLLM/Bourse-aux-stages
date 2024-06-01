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
            'country' => 'France',
            'enabled' => $faker->boolean(),
            'name' => $faker->company(),
            'postalCode' => $faker->postcode(),
            'siret' => $faker->siret(),
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
