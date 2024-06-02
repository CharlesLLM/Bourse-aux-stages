<?php

namespace App\Tests\Factory;

use App\Entity\User;
use App\Enum\GenderEnum;
use Faker\Factory;
use Zenstruck\Foundry\ModelFactory;

final class UserFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        $faker = Factory::create('fr_FR');

        return [
            'email' => $faker->unique()->safeEmail(),
            'firstName' => $faker->firstName(),
            'lastName' => $faker->lastName(),
            'phone' => $faker->phoneNumber(),
            'enabled' => $faker->boolean(),
            'gender' => $faker->randomElement(GenderEnum::cases()),
            'language' => LanguageFactory::new(),
            'password' => $faker->text(255),
            'birthDate' => $faker->dateTimeBetween('-50 years', '-18 years'),
            'roles' => [],
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return User::class;
    }
}
