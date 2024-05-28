<?php

namespace App\Tests\Factory;

use App\Entity\Offer;
use App\Entity\Request;
use App\Enum\OffersNameEnum;
use App\Enum\OfferTypeEnum;
use App\Repository\OfferRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

final class RequestFactory  extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'student' => StudentFactory::new(),
            'description' => self::faker()->text(255),
            'name' => self::faker()->randomElement(OffersNameEnum::cases())->value,
            'type' => self::faker()->randomElement(OfferTypeEnum::cases()),
            'startDate' => self::faker()->dateTimeBetween('+30 days', '+60 days'),
            'endDate' => self::faker()->dateTimeBetween('+90 days', '+120 days'),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Request::class;
    }
}
