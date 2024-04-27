<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setName('admin')
            ->setFirstname('admin')
            ->setEmail($_ENV['ADMIN_EMAIL'])
            ->setRoles(['ROLE_ADMIN'])
            ->setPassword(password_hash('admin', \PASSWORD_BCRYPT));

        $manager->persist($user);
        $manager->flush();
    }
}
