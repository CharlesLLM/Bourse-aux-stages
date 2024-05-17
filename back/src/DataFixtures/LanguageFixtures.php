<?php

namespace App\DataFixtures;

use App\Entity\Language;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class LanguageFixtures extends Fixture
{
    public const REFERENCE_IDENTIFIER = 'language_';
    public const FIXTURE_RANGE = 2;
    public const DATA = [
        'fr' => 'Français',
        'en' => 'English',
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::DATA as $key => $item) {
            $language = new Language();
            $language->setCode($key)
                ->setName($item);
            $manager->persist($language);

            // Example: 'language_fr'
            $this->addReference(self::REFERENCE_IDENTIFIER.$key, $language);
        }

        $manager->flush();
    }
}
