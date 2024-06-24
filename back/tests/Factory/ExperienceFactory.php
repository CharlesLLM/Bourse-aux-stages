<?php

namespace App\Tests\Factory;

use App\Entity\Experience;
use Zenstruck\Foundry\ModelFactory;

final class ExperienceFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        $faker = Factory::create('fr_FR');
        $positions = [
            'Assistant',
            'Développeur',
            'Designer',
            'Commercial',
            'RH',
            'Comptable',
        ];

        return [
            'companyName' => $faker->company(),
            'description' => $faker->sentences(5, true),
            'position' => $faker->randomElement($positions),
            'student' => StudentFactory::new(),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Experience::class;
    }
}
