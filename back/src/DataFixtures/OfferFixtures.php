<?php

namespace App\DataFixtures;

use App\Tests\Factory\OfferFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class OfferFixtures extends Fixture
{
    public const FIXTURE_RANGE = 20;

    public function load(ObjectManager $manager): void
    {
        $tags = [];
        for ($i = 1; $i <= TagFixtures::FIXTURE_RANGE; ++$i) {
            $tags[] = $this->getReference(TagFixtures::REFERENCE_IDENTIFIER.$i);
        }

        OfferFactory::new()->many(10)->create(function () use ($tags) {
            $selectedTags = \array_slice($tags, 0, mt_rand(1, 3));

            return [
                'tags' => $selectedTags,
            ];
        });

        $manager->flush();
    }
}
