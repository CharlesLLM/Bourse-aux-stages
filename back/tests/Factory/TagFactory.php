<?php

namespace App\Tests\Factory;

use App\Entity\Tag;
use App\Enum\WorkSectorEnum;
use App\Repository\TagRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Tag>
 *
 * @method        Tag|Proxy                     create(array|callable $attributes = [])
 * @method static Tag|Proxy                     createOne(array $attributes = [])
 * @method static Tag|Proxy                     find(object|array|mixed $criteria)
 * @method static Tag|Proxy                     findOrCreate(array $attributes)
 * @method static Tag|Proxy                     first(string $sortedField = 'id')
 * @method static Tag|Proxy                     last(string $sortedField = 'id')
 * @method static Tag|Proxy                     random(array $attributes = [])
 * @method static Tag|Proxy                     randomOrCreate(array $attributes = [])
 * @method static TagRepository|RepositoryProxy repository()
 * @method static Tag[]|Proxy[]                 all()
 * @method static Tag[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Tag[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Tag[]|Proxy[]                 findBy(array $attributes)
 * @method static Tag[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Tag[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
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
