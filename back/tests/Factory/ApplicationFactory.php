<?php

namespace App\Tests\Factory;

use App\Entity\Application;
use App\Enum\ApplicationStatusEnum;
use App\Repository\ApplicationRepository;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Application>
 *
 * @method        Application|Proxy                     create(array|callable $attributes = [])
 * @method static Application|Proxy                     createOne(array $attributes = [])
 * @method static Application|Proxy                     find(object|array|mixed $criteria)
 * @method static Application|Proxy                     findOrCreate(array $attributes)
 * @method static Application|Proxy                     first(string $sortedField = 'id')
 * @method static Application|Proxy                     last(string $sortedField = 'id')
 * @method static Application|Proxy                     random(array $attributes = [])
 * @method static Application|Proxy                     randomOrCreate(array $attributes = [])
 * @method static ApplicationRepository|RepositoryProxy repository()
 * @method static Application[]|Proxy[]                 all()
 * @method static Application[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Application[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Application[]|Proxy[]                 findBy(array $attributes)
 * @method static Application[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Application[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class ApplicationFactory extends ModelFactory
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
        return Application::class;
    }
}
