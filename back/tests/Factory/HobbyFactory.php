<?php

namespace App\Tests\Factory;

use App\Entity\Hobby;
use Zenstruck\Foundry\ModelFactory;

final class HobbyFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'name' => self::faker()->text(255),
            'student' => StudentFactory::new(),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Hobby::class;
    }
}
