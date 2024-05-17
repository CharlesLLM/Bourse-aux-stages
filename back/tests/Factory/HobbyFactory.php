<?php

namespace App\Tests\Factory;

use App\Entity\Hobby;
use App\Repository\HobbyRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Hobby>
 *
 * @method        Hobby|Proxy                     create(array|callable $attributes = [])
 * @method static Hobby|Proxy                     createOne(array $attributes = [])
 * @method static Hobby|Proxy                     find(object|array|mixed $criteria)
 * @method static Hobby|Proxy                     findOrCreate(array $attributes)
 * @method static Hobby|Proxy                     first(string $sortedField = 'id')
 * @method static Hobby|Proxy                     last(string $sortedField = 'id')
 * @method static Hobby|Proxy                     random(array $attributes = [])
 * @method static Hobby|Proxy                     randomOrCreate(array $attributes = [])
 * @method static HobbyRepository|RepositoryProxy repository()
 * @method static Hobby[]|Proxy[]                 all()
 * @method static Hobby[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Hobby[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Hobby[]|Proxy[]                 findBy(array $attributes)
 * @method static Hobby[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Hobby[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
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
