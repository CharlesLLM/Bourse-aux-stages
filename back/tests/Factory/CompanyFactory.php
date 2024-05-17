<?php

namespace App\Tests\Factory;

use App\Entity\Company;
use App\Repository\CompanyRepository;
use Faker\Factory;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;
use Zenstruck\Foundry\RepositoryProxy;

/**
 * @extends ModelFactory<Company>
 *
 * @method        Company|Proxy                     create(array|callable $attributes = [])
 * @method static Company|Proxy                     createOne(array $attributes = [])
 * @method static Company|Proxy                     find(object|array|mixed $criteria)
 * @method static Company|Proxy                     findOrCreate(array $attributes)
 * @method static Company|Proxy                     first(string $sortedField = 'id')
 * @method static Company|Proxy                     last(string $sortedField = 'id')
 * @method static Company|Proxy                     random(array $attributes = [])
 * @method static Company|Proxy                     randomOrCreate(array $attributes = [])
 * @method static CompanyRepository|RepositoryProxy repository()
 * @method static Company[]|Proxy[]                 all()
 * @method static Company[]|Proxy[]                 createMany(int $number, array|callable $attributes = [])
 * @method static Company[]|Proxy[]                 createSequence(iterable|callable $sequence)
 * @method static Company[]|Proxy[]                 findBy(array $attributes)
 * @method static Company[]|Proxy[]                 randomRange(int $min, int $max, array $attributes = [])
 * @method static Company[]|Proxy[]                 randomSet(int $number, array $attributes = [])
 */
final class CompanyFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        $faker = Factory::create('fr_FR');

        return [
            'address' => self::faker()->text(255),
            'city' => self::faker()->text(50),
            'country' => self::faker()->text(30),
            'enabled' => self::faker()->boolean(),
            'name' => self::faker()->text(255),
            'postalCode' => self::faker()->text(15),
            'siret' => $faker->siret(),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Company::class;
    }
}
