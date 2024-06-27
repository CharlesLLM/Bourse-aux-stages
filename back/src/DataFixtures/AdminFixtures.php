<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use App\Tests\Factory\AdminFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class AdminFixtures extends Fixture implements DependentFixtureInterface
{
    public const REFERENCE_IDENTIFIER = 'admin_';
    public const FIXTURE_RANGE = 1;
    public const DATA = [
        [
            'user' => 'user_superadmin',
            'company' => 'company_1',
            'position' => 'PDG',
            'enabled' => true,
        ],
        [
            'user' => 'user_2',
            'company' => 'company_1',
            'position' => 'Développeur',
            'enabled' => true,
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::DATA as $data) {
            $admin = $this->processAdmin($data);
            $manager->persist($admin);
        }

        AdminFactory::new()->many(10)->create(function () {
            $selectedCompany = $this->getReference(CompanyFixtures::REFERENCE_IDENTIFIER.mt_rand(1, CompanyFixtures::FIXTURE_RANGE));

            return [
                'company' => $selectedCompany,
            ];
        });

        $manager->flush();
    }

    public function processAdmin(array $data): Admin
    {
        $admin = new Admin();
        $admin->setPosition($data['position'])
            ->setUser($this->getReference($data['user']))
            ->setCompany($this->getReference($data['company']))
            ->setEnabled($data['enabled'])
        ;
        $admin->getUser()->addRole('ROLE_ADMIN');

        return $admin;
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            CompanyFixtures::class,
        ];
    }
}
