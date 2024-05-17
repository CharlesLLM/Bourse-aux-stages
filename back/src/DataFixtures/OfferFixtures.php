<?php

namespace App\DataFixtures;

use App\Tests\Factory\OfferFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class OfferFixtures extends Fixture
{
    public const FIXTURE_RANGE = 50;

    public function load(ObjectManager $manager)
    {
        OfferFactory::createMany(self::FIXTURE_RANGE);

        $manager->flush();
    }
}
