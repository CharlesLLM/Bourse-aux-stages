<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Enum\GenderEnum;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public const array DATA = [
        [
            'lastName' => 'Doe',
            'firstName' => 'John',
            'gender' => GenderEnum::MALE,
            'phone' => '0601020304',
            'email' => 'johndoe@gmail.com',
            'password' => 'john123',
        ],
        [
            'lastName' => 'Doe',
            'firstName' => 'Jane',
            'gender' => GenderEnum::FEMALE,
            'phone' => '0601020305',
            'email' => 'janedoe@gmail.com',
            'password' => 'jane456',
        ],
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::DATA as $key => $item) {
            $user = $this->processUser($item);
            $manager->persist($user);

            ++$key;
            $this->addReference('user_'.$key, $user);
        }

        // Superadmin
        $user = new User();
        $user->setLastName('superadmin')
            ->setFirstName('superadmin')
            ->setGender(GenderEnum::OTHER)
            ->setPhone('0600000000')
            ->setEmail($_ENV['SUPERADMIN_EMAIL'])
            ->setRoles(['ROLE_SUPERADMIN'])
            ->setPassword(password_hash('admin', \PASSWORD_BCRYPT));

        $manager->persist($user);

        $manager->flush();
    }

    public function processUser(array $data): User
    {
        $user = new User();
        $user->setLastName($data['lastName'])
            ->setFirstName($data['firstName'])
            ->setGender($data['gender'])
            ->setPhone($data['phone'])
            ->setEmail($data['email'])
            ->setRoles(['ROLE_USER'])
            ->setPassword(password_hash($data['password'], \PASSWORD_BCRYPT));

        return $user;
    }
}
