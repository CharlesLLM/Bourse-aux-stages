<?php

namespace App\Tests\Factory;

use App\Entity\Tag;
use App\Enum\WorkSectorEnum;
use Zenstruck\Foundry\ModelFactory;

final class TagFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'color' => self::faker()->hexColor(),
            'name' => self::faker()->randomElement(WorkSectorEnum::cases())->value,
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Tag::class;
    }
}
