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
        return [
            'companyName' => self::faker()->text(255),
            'description' => self::faker()->text(),
            'position' => self::faker()->text(100),
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
