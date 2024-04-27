<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Enum\GenderEnum;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setLastName('admin')
            ->setFirstName('admin')
            ->setGender(GenderEnum::OTHER)
            ->setPhone('0600000000')
            ->setEmail($_ENV['ADMIN_EMAIL'])
            ->setRoles(['ROLE_ADMIN'])
            ->setPassword(password_hash('admin', \PASSWORD_BCRYPT));

        $manager->persist($user);
        $manager->flush();
    }
}
