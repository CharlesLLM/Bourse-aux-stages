<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Tests\Factory\CompanyFactory;
use App\Tests\Factory\TagFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CompanyFixtures extends Fixture implements DependentFixtureInterface
{
    public const REFERENCE_IDENTIFIER = 'company_';
    public const FIXTURE_RANGE = 20;
    public const DATA = [
        [
            'name' => 'MentalWorks',
            'siret' => '123 456 789 01234',
            'summary' => 'Mentalworks est à la fois une agence web et webmarketing mais aussi une SSII/ESN spécialisée dans le développement et la maintenance d’applications sur-mesure.',
            'description' => 'Mentalworks représente une nouvelle génération : celle des agences digitales technologiques. Notre particularité est d\'intégrer à la fois une agence web et e-marketing (conseil stratégique, SEO/SEA/CM) mais aussi une SSII/ESN composée de développeurs spécialisés pour couvrir toutes les technologies et répondre à tous les besoins: créer ou développer des applications métiers ou applis mobiles/tablettes, relier ou synchroniser un site e-commerce avec un ERP/CRM existant ou avec tout autre système d\'information, etc.',
            'address' => '41 Rue Irene Joliot Curie',
            'additionalAddress' => 'Bâtiment Millenium',
            'postalCode' => '60610',
            'city' => 'Lacroix Saint-Ouen',
            'country' => 'France',
            'xLink' => 'https://www.x.com/entreprise-parisienne',
            'linkedinLink' => 'https://www.linkedin.com/entreprise-parisienne',
            'enabled' => true,
            'tags' => [
                TagFixtures::TAG_IT,
                TagFixtures::TAG_MARKETING,
                TagFixtures::TAG_DESIGN,
            ],
        ],
        [
            'name' => 'Truebill',
            'siret' => '000 000 000 00000',
            'summary' => 'Prenez le contrôle de votre argent. Truebill développe une application mobile qui aide les consommateurs à prendre le contrôle de leurs finances...',
            'address' => '1 Place de la Comédie',
            'postalCode' => '69001',
            'city' => 'Lyon',
            'country' => 'France',
            'tags' => [
                TagFixtures::TAG_IT,
            ],
        ],
        [
            'name' => 'Coinbase',
            'siret' => '987 654 321 09876',
            'summary' => 'Coinbase est un porte-monnaie numérique et une plateforme où les commerçants et les consommateurs peuvent effectuer des transactions avec des cryptomonnaies...',
            'address' => '3 Boulevard Michelet',
            'postalCode' => '13008',
            'city' => 'Marseille',
            'country' => 'France',
            'tags' => [
                TagFixtures::TAG_IT,
                TagFixtures::TAG_FINANCES,
            ],
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        $tags = TagFactory::new()->many(self::FIXTURE_RANGE)->create();
        shuffle($tags);
        CompanyFactory::new()->many(10)->create(function () use ($tags) {
            $selectedTags = \array_slice($tags, 0, mt_rand(2, 3));

            return [
                'tags' => $selectedTags,
            ];
        });
        $manager->flush();
    }

    public function processCompany(array $data): Company
    {
        $company = new Company();
        $company->setName($data['name'])
            ->setSiret($data['siret'])
            ->setSummary($data['summary'] ?? null)
            ->setDescription($data['description'] ?? null)
            ->setAddress($data['address'])
            ->setAdditionalAddress($data['additionalAddress'] ?? null)
            ->setPostalCode($data['postalCode'])
            ->setCity($data['city'])
            ->setCountry($data['country'])
            ->setXLink($data['xLink'] ?? null)
            ->setLinkedinLink($data['linkedinLink'] ?? null)
            ->setEnabled($data['enabled'] ?? false)
        ;

        foreach ($data['tags'] as $tag) {
            $company->addTag($this->getReference($tag));
        }

        return $company;
    }

    public function getDependencies(): array
    {
        return [
            TagFixtures::class,
        ];
    }
}
