<?php

namespace App\Tests\Factory;

use App\Entity\Language;
use App\Repository\LanguageRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Language>
 *
 * @method        Language|Proxy                     create(array|callable $attributes = [])
 * @method static Language|Proxy                     createOne(array $attributes = [])
 * @method static Language|Proxy                     find(object|array|mixed $criteria)
 * @method static Language|Proxy                     findOrCreate(array $attributes)
 * @method static Language|Proxy                     first(string $sortedField = 'id')
 * @method static Language|Proxy                     last(string $sortedField = 'id')
 * @method static Language|Proxy                     random(array $attributes = [])
 * @method static Language|Proxy                     randomOrCreate(array $attributes = [])
 * @method static LanguageRepository|RepositoryProxy repository()
 * @method static Language[]|Proxy[]                 all()
 * @method static Language[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Language[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Language[]|Proxy[]                 findBy(array $attributes)
 * @method static Language[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Language[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
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
