<?php

namespace App\DataFixtures;

use App\Tests\Factory\OfferFactory;
use App\Tests\Factory\TagFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class OfferFixtures extends Fixture
{
    public const FIXTURE_RANGE = 50;

    public function load(ObjectManager $manager): void
    {
        $tags = TagFactory::createMany(10);
        shuffle($tags);

        OfferFactory::new()->many(10)->create(function () use ($tags) {
            $selectedTags = \array_slice($tags, 0, mt_rand(2, 3));

            return [
                'tags' => $selectedTags,
            ];
        });

        $manager->flush();
    }
}
