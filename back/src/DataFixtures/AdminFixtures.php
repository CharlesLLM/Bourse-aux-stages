<?php

namespace App\DataFixtures;

use App\Entity\Admin;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class AdminFixtures extends Fixture implements DependentFixtureInterface
{
    public const REFERENCE_IDENTIFIER = 'admin_';
    public const FIXTURE_RANGE = 1;
    public const DATA = [
        [
            'user' => 'user_2',
            'company' => 'company_1',
            'position' => 'PDG',
            'enabled' => true,
        ],
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::DATA as $key => $item) {
            $admin = $this->processAdmin($item);
            $manager->persist($admin);

            ++$key;
            $this->addReference(self::FIXTURE_RANGE.$key, $admin);
        }

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

    public function getDependencies()
    {
        return [
            UserFixtures::class,
            CompanyFixtures::class,
        ];
    }
}
