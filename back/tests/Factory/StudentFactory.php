<?php

namespace App\Tests\Factory;

use App\Entity\Student;
use Faker\Factory;
use Zenstruck\Foundry\ModelFactory;

final class StudentFactory extends ModelFactory
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
            'city' => $faker->city(),
            'country' => $faker->country(),
            'postalCode' => $faker->postcode(),
            'skills' => SkillFactory::new()->many(5),
            'user' => UserFactory::new(),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Student::class;
    }
}
