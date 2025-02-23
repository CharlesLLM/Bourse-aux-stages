<?php

namespace App\DataFixtures;

use App\Entity\Company;
use App\Tests\Factory\CompanyFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CompanyFixtures extends Fixture implements DependentFixtureInterface
{
    public const REFERENCE_IDENTIFIER = 'company_';
    public const FIXTURE_RANGE = 3;
    public const DATA = [
        [
            'name' => 'MentalWorks',
            'siret' => '123 456 789 01234',
            'creation_date' => '2000-01-01',
            'summary' => 'Mentalworks est à la fois une agence web et webmarketing mais aussi une SSII/ESN spécialisée dans le développement et la maintenance d’applications sur-mesure.',
            'description' => 'Mentalworks représente une nouvelle génération : celle des agences digitales technologiques. Notre particularité est d\'intégrer à la fois une agence web et e-marketing (conseil stratégique, SEO/SEA/CM) mais aussi une SSII/ESN composée de développeurs spécialisés pour couvrir toutes les technologies et répondre à tous les besoins: créer ou développer des applications métiers ou applis mobiles/tablettes, relier ou synchroniser un site e-commerce avec un ERP/CRM existant ou avec tout autre système d\'information, etc.',
            'size' => 22,
            'revenue' => 1200000,
            'address' => '41 Rue Irene Joliot Curie',
            'additionalAddress' => 'Bâtiment Millenium',
            'postalCode' => '60610',
            'city' => 'Lacroix Saint-Ouen',
            'country' => 'FR',
            'websiteLink' => 'https://www.mentalworks.fr',
            'websiteLinkLabel' => 'mentalworks.fr',
            'xLink' => 'https://www.x.com/entreprise-parisienne',
            'linkedinLink' => 'https://www.linkedin.com/entreprise-parisienne',
            'distance' => 10,
            'phone' => '03 44 86 22 55',
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
            'creation_date' => '2015-01-01',
            'summary' => 'Prenez le contrôle de votre argent. Truebill développe une application mobile qui aide les consommateurs à prendre le contrôle de leurs finances...',
            'description' => 'Truebill est une application mobile qui aide les consommateurs à prendre le contrôle de leurs finances. L\'application permet aux utilisateurs de suivre leurs abonnements, de gérer leurs factures et de trouver des économies potentielles.',
            'size' => 50,
            'revenue' => 500000,
            'address' => '1 Place de la Comédie',
            'postalCode' => '69001',
            'city' => 'Lyon',
            'country' => 'FR',
            'distance' => 20,
            'phone' => '01 23 45 67 89',
            'tags' => [
                TagFixtures::TAG_IT,
            ],
        ],
        [
            'name' => 'Coinbase',
            'siret' => '987 654 321 09876',
            'creation_date' => '2012-01-01',
            'summary' => 'Coinbase est un porte-monnaie numérique et une plateforme où les commerçants et les consommateurs peuvent effectuer des transactions avec des cryptomonnaies...',
            'description' => 'Coinbase est un porte-monnaie numérique et une plateforme où les commerçants et les consommateurs peuvent effectuer des transactions avec des cryptomonnaies telles que le Bitcoin, l\'Ethereum et le Litecoin.',
            'size' => 100,
            'revenue' => 10000000,
            'address' => '3 Boulevard Michelet',
            'postalCode' => '13008',
            'city' => 'Marseille',
            'country' => 'FR',
            'distance' => 50,
            'tags' => [
                TagFixtures::TAG_IT,
                TagFixtures::TAG_FINANCES,
            ],
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::DATA as $key => $data) {
            $company = $this->processCompany($data);
            $manager->persist($company);
            ++$key;
            $this->addReference(self::REFERENCE_IDENTIFIER.$key, $company);
        }

        $tags = [];
        for ($i = 1; $i <= TagFixtures::FIXTURE_RANGE; ++$i) {
            $tags[] = $this->getReference(TagFixtures::REFERENCE_IDENTIFIER.$i);
        }

        CompanyFactory::new()->many(10)->create(function () use ($tags) {
            $selectedCategory = $this->getReference(CompanyCategoryFixtures::REFERENCE_IDENTIFIER.mt_rand(1, CompanyCategoryFixtures::FIXTURE_RANGE));
            $selectedTags = \array_slice($tags, 0, mt_rand(1, 3));

            return [
                'category' => $selectedCategory,
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
            ->setCreationDate(new \DateTime($data['creation_date']))
            ->setSummary($data['summary'] ?? null)
            ->setDescription($data['description'] ?? null)
            ->setSize($data['size'])
            ->setRevenue($data['revenue'])
            ->setAddress($data['address'])
            ->setAdditionalAddress($data['additionalAddress'] ?? null)
            ->setPostalCode($data['postalCode'])
            ->setCity($data['city'])
            ->setCountry($data['country'])
            ->setWebsiteLink($data['websiteLink'] ?? null)
            ->setWebsiteLinkLabel($data['websiteLinkLabel'] ?? null)
            ->setXLink($data['xLink'] ?? null)
            ->setLinkedinLink($data['linkedinLink'] ?? null)
            ->setDistance($data['distance'] ?? null)
            ->setPhone($data['phone'] ?? null)
            ->setEnabled($data['enabled'] ?? false)
            ->setCategory($this->getReference(CompanyCategoryFixtures::REFERENCE_IDENTIFIER.mt_rand(1, CompanyCategoryFixtures::FIXTURE_RANGE)))
        ;

        foreach ($data['tags'] as $tag) {
            $company->addTag($this->getReference($tag));
        }

        return $company;
    }

    public function getDependencies(): array
    {
        return [
            CompanyCategoryFixtures::class,
            TagFixtures::class,
        ];
    }
}
