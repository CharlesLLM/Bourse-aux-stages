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
        $user->setName('admin');
        $user->setFirstname('admin');
        $user->setEmail($_ENV['ADMIN_EMAIL']);
        $user->setRoles(['ROLE_ADMIN']);

        $user->setPassword(password_hash("admin", PASSWORD_BCRYPT));

        $manager->persist($user);
        $manager->flush();
    }
}
