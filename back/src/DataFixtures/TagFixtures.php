<?php

namespace App\DataFixtures;

use App\Tests\Factory\TagFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class TagFixtures extends Fixture
{
    public const REFERENCE_IDENTIFIER = 'tag_';
    public const FIXTURE_RANGE = 10;

    public const TAG_IT = 'tag_1';
    public const TAG_MARKETING = 'tag_2';
    public const TAG_FINANCES = 'tag_3';
    public const TAG_DESIGN = 'tag_4';

    public const DATA = [
        [
            'name' => 'Informatique',
            'color' => '#FF6550',
        ],
        [
            'name' => 'Marketing',
            'color' => '#EB8533',
        ],
        [
            'name' => 'Finances',
            'color' => '#4640DE',
        ],
        [
            'name' => 'Design',
            'color' => '#56CDAD',
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        TagFactory::createMany(self::FIXTURE_RANGE);

        $manager->flush();
    }
}
