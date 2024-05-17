<?php

namespace App\Tests\Factory;

use App\Entity\Formation;
use App\Enum\LevelEnum;
use App\Repository\FormationRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Formation>
 *
 * @method        Formation|Proxy                     create(array|callable $attributes = [])
 * @method static Formation|Proxy                     createOne(array $attributes = [])
 * @method static Formation|Proxy                     find(object|array|mixed $criteria)
 * @method static Formation|Proxy                     findOrCreate(array $attributes)
 * @method static Formation|Proxy                     first(string $sortedField = 'id')
 * @method static Formation|Proxy                     last(string $sortedField = 'id')
 * @method static Formation|Proxy                     random(array $attributes = [])
 * @method static Formation|Proxy                     randomOrCreate(array $attributes = [])
 * @method static FormationRepository|RepositoryProxy repository()
 * @method static Formation[]|Proxy[]                 all()
 * @method static Formation[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Formation[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Formation[]|Proxy[]                 findBy(array $attributes)
 * @method static Formation[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Formation[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class FormationFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'level' => self::faker()->randomElement(LevelEnum::cases()),
            'name' => self::faker()->text(255),
            'schoolName' => self::faker()->text(100),
            'student' => StudentFactory::new(),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Formation::class;
    }
}
