<?php

namespace App\DataFixtures;

use App\Tests\Factory\OfferFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class OfferFixtures extends Fixture implements DependentFixtureInterface
{
    public const FIXTURE_RANGE = 10;

    public function load(ObjectManager $manager): void
    {
        $tags = [];
        for ($i = 1; $i <= TagFixtures::FIXTURE_RANGE; ++$i) {
            $tags[] = $this->getReference(TagFixtures::REFERENCE_IDENTIFIER.$i);
        }

        OfferFactory::new()->many(10)->create(function () use ($tags) {
            $selectedCompany = $this->getReference(CompanyFixtures::REFERENCE_IDENTIFIER.mt_rand(1, CompanyFixtures::FIXTURE_RANGE));
            $selectedTags = \array_slice($tags, 0, mt_rand(1, 3));

            return [
                'company' => $selectedCompany,
                'tags' => $selectedTags,
            ];
        });

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            TagFixtures::class,
        ];
    }
}
