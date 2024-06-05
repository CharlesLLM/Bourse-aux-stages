<?php

namespace App\DataFixtures;

use App\Tests\Factory\OfferFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class OfferFixtures extends Fixture implements DependentFixtureInterface
{
    public const FIXTURE_RANGE = 50;

    public function load(ObjectManager $manager): void
    {
        $tags = [];
        for ($i = 1; $i <= TagFixtures::FIXTURE_RANGE; ++$i) {
            $tags[] = $this->getReference(TagFixtures::REFERENCE_IDENTIFIER.$i);
        }

        OfferFactory::new()->many(50)->create(function () use ($tags) {
            $selectedCompany = $this->getReference(CompanyFixtures::REFERENCE_IDENTIFIER.mt_rand(1, CompanyFixtures::FIXTURE_RANGE));
            $selectedTags = [];
            while (count($selectedTags) < 1) {
                foreach ($tags as $tag) {
                    rand(0, 1) ? $selectedTags[] = $tag : null;
                }
            }

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
