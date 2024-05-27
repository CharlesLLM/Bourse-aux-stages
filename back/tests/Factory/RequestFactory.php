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

/**
 * @extends ModelFactory<Offer>
 *
 * @method        Offer|Proxy                     create(array|callable $attributes = [])
 * @method static Offer|Proxy                     createOne(array $attributes = [])
 * @method static Offer|Proxy                     find(object|array|mixed $criteria)
 * @method static Offer|Proxy                     findOrCreate(array $attributes)
 * @method static Offer|Proxy                     first(string $sortedField = 'id')
 * @method static Offer|Proxy                     last(string $sortedField = 'id')
 * @method static Offer|Proxy                     random(array $attributes = [])
 * @method static Offer|Proxy                     randomOrCreate(array $attributes = [])
 * @method static OfferRepository|RepositoryProxy repository()
 * @method static Offer[]|Proxy[]                 all()
 * @method static Offer[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Offer[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Offer[]|Proxy[]                 findBy(array $attributes)
 * @method static Offer[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Offer[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */

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
