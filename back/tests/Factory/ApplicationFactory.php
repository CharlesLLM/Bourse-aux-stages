<?php

namespace App\Tests\Factory;

use App\Entity\Application;
use App\Enum\ApplicationStatusEnum;
use Zenstruck\Foundry\ModelFactory;

final class ApplicationFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'offer' => OfferFactory::new(),
            'status' => self::faker()->randomElement(ApplicationStatusEnum::cases()),
            'student' => StudentFactory::new(),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Application::class;
    }
}
