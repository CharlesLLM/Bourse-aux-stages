<?php

namespace App\Tests\Factory;

use App\Entity\SpontaneousApplication;
use App\Enum\ApplicationStatusEnum;
use App\Repository\SpontaneousApplicationRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<SpontaneousApplication>
 *
 * @method        SpontaneousApplication|Proxy                     create(array|callable $attributes = [])
 * @method static SpontaneousApplication|Proxy                     createOne(array $attributes = [])
 * @method static SpontaneousApplication|Proxy                     find(object|array|mixed $criteria)
 * @method static SpontaneousApplication|Proxy                     findOrCreate(array $attributes)
 * @method static SpontaneousApplication|Proxy                     first(string $sortedField = 'id')
 * @method static SpontaneousApplication|Proxy                     last(string $sortedField = 'id')
 * @method static SpontaneousApplication|Proxy                     random(array $attributes = [])
 * @method static SpontaneousApplication|Proxy                     randomOrCreate(array $attributes = [])
 * @method static SpontaneousApplicationRepository|RepositoryProxy repository()
 * @method static SpontaneousApplication[]|Proxy[]                 all()
 * @method static SpontaneousApplication[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static SpontaneousApplication[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static SpontaneousApplication[]|Proxy[]                 findBy(array $attributes)
 * @method static SpontaneousApplication[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static SpontaneousApplication[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class SpontaneousApplicationFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'company' => CompanyFactory::new(),
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
        return SpontaneousApplication::class;
    }
}
