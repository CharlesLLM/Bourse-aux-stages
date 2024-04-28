<?php

namespace App\DataFixtures;

use App\Entity\Company;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CompanyFixtures extends Fixture
{
    public const array DATA = [
        [
            'name' => 'Entreprise parisienne',
            'siret' => '12345678901234',
            'address' => 'Place Charles de Gaulle',
            'postalCode' => '75008',
            'city' => 'Paris',
            'country' => 'France',
            'xLink' => 'https://www.x.com/entreprise-parisienne',
            'linkedinLink' => 'https://www.linkedin.com/entreprise-parisienne',
        ],
        [
            'name' => 'Entreprise lyonnaise',
            'siret' => '00000000000000',
            'address' => '1 Place de la Comédie',
            'postalCode' => '69001',
            'city' => 'Lyon',
            'country' => 'France',
        ],
        [
            'name' => 'Entreprise marseillaise',
            'siret' => '98765432109876',
            'address' => '3 Boulevard Michelet',
            'postalCode' => '13008',
            'city' => 'Marseille',
            'country' => 'France',
            'xLink' => 'https://www.x.com/entreprise-marseillaise',
        ],
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::DATA as $key => $item) {
            $company = $this->processCompany($item);
            $manager->persist($company);

            ++$key;
            $this->addReference('company_' . $key, $company);
        }

        $manager->flush();
    }

    public function processCompany(array $data): Company
    {
        $company = new Company();
        $company->setName($data['name'])
            ->setSiret($data['siret'])
            ->setAddress($data['address'])
            ->setPostalCode($data['postalCode'])
            ->setCity($data['city'])
            ->setCountry($data['country'])
            ->setXLink($data['xLink'] ?? null)
            ->setLinkedinLink($data['linkedinLink'] ?? null)
        ;

        return $company;
    }
}
