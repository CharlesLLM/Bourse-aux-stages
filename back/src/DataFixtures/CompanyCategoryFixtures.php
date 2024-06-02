<?php

namespace App\DataFixtures;

use App\Entity\CompanyCategory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CompanyCategoryFixtures extends Fixture
{
    public const REFERENCE_IDENTIFIER = 'company_category_';
    public const FIXTURE_RANGE = 6;
    public const DATA = [
        'Services aux particuliers',
        'Services aux entreprises',
        'Mairie, collectivité',
        'Association, ONG',
        'Organismes d\'état',
        'Autres',
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::DATA as $key => $data) {
            $companyCategory = new CompanyCategory();
            $companyCategory->setName($data);

            $manager->persist($companyCategory);
            ++$key;
            $this->addReference(self::REFERENCE_IDENTIFIER.$key, $companyCategory);
        }

        $manager->flush();
    }
}
