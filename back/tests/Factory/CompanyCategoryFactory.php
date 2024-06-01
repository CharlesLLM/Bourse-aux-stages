<?php

namespace App\Tests\Factory;

use App\Entity\CompanyCategory;
use Zenstruck\Foundry\ModelFactory;

final class CompanyCategoryFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'name' => self::faker()->text(50),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return CompanyCategory::class;
    }
}
