<?php

namespace App\DataFixtures;

use App\Tests\Factory\RequestFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class RequestFixtures extends Fixture
{
    public const FIXTURE_RANGE = 50;

    public function load(ObjectManager $manager)
    {
        RequestFactory::createMany(self::FIXTURE_RANGE);

        $manager->flush();
    }
}
