<?php

namespace App\DataFixtures;

use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class TagFixtures extends Fixture
{
    public const REFERENCE_IDENTIFIER = 'tag_';
    public const FIXTURE_RANGE = 4;

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
        foreach (self::DATA as $key => $data) {
            $tag = new Tag();
            $tag->setName($data['name'])
                ->setColor($data['color']);
            $manager->persist($tag);

            ++$key;
            $this->addReference(self::REFERENCE_IDENTIFIER.$key, $tag);
        }

        $manager->flush();
    }
}
