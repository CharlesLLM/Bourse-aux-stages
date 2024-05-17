<?php

namespace App\Tests\Factory;

use App\Entity\Skill;
use App\Repository\SkillRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Skill>
 *
 * @method        Skill|Proxy                     create(array|callable $attributes = [])
 * @method static Skill|Proxy                     createOne(array $attributes = [])
 * @method static Skill|Proxy                     find(object|array|mixed $criteria)
 * @method static Skill|Proxy                     findOrCreate(array $attributes)
 * @method static Skill|Proxy                     first(string $sortedField = 'id')
 * @method static Skill|Proxy                     last(string $sortedField = 'id')
 * @method static Skill|Proxy                     random(array $attributes = [])
 * @method static Skill|Proxy                     randomOrCreate(array $attributes = [])
 * @method static SkillRepository|RepositoryProxy repository()
 * @method static Skill[]|Proxy[]                 all()
 * @method static Skill[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Skill[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Skill[]|Proxy[]                 findBy(array $attributes)
 * @method static Skill[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Skill[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class SkillFactory extends ModelFactory
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
        return Skill::class;
    }
}
