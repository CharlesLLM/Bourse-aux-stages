<?php

namespace App\Tests\Factory;

use App\Entity\Language;
use Zenstruck\Foundry\ModelFactory;

final class LanguageFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'code' => self::faker()->text(5),
            'name' => self::faker()->text(30),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Language::class;
    }
}
