<?php

namespace App\Tests\Factory;

use App\Entity\Formation;
use App\Enum\LevelEnum;
use Zenstruck\Foundry\ModelFactory;

final class FormationFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'level' => self::faker()->randomElement(LevelEnum::cases()),
            'name' => self::faker()->text(255),
            'schoolName' => self::faker()->text(100),
            'student' => StudentFactory::new(),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Formation::class;
    }
}
