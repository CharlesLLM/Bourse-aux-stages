<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Enum\GenderEnum;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture implements DependentFixtureInterface
{
    public const REFERENCE_IDENTIFIER = 'user_';
    public const FIXTURE_RANGE = 2;
    public const DATA = [
        [
            'lastName' => 'Doe',
            'firstName' => 'John',
            'gender' => GenderEnum::MALE,
            'phone' => '0601020304',
            'email' => 'johndoe@gmail.com',
            'password' => 'john123',
            'birthDate' => '1990-01-01',
        ],
        [
            'lastName' => 'Doe',
            'firstName' => 'Jane',
            'gender' => GenderEnum::FEMALE,
            'phone' => '0601020305',
            'email' => 'janedoe@gmail.com',
            'password' => 'jane456',
            'birthDate' => '1990-01-01',
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::DATA as $key => $item) {
            $user = $this->processUser($item);
            $manager->persist($user);

            ++$key;
            $this->addReference(self::REFERENCE_IDENTIFIER.$key, $user);
        }

        $superadmin = $this->processSuperadmin();
        $manager->persist($superadmin);

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
            ->setBirthDate(new \DateTime($data['birthDate']))
            ->setPassword(password_hash($data['password'], \PASSWORD_BCRYPT))
            ->setLanguage($this->getReference(LanguageFixtures::REFERENCE_IDENTIFIER.'fr'))
            ->setEnabled(true)
        ;

        return $user;
    }

    public function processSuperadmin(): User
    {
        $superadmin = new User();
        $superadmin->setLastName('superadmin')
            ->setFirstName('superadmin')
            ->setGender(GenderEnum::OTHER)
            ->setPhone('0600000000')
            ->setEmail($_ENV['SUPERADMIN_EMAIL'])
            ->setRoles(['ROLE_SUPERADMIN'])
            ->setBirthDate(new \DateTime('1990-01-01'))
            ->setLanguage($this->getReference(LanguageFixtures::REFERENCE_IDENTIFIER.'fr'))
            ->setEnabled(true)
        ;
        $password = $_ENV['SUPERADMIN_PASSWORD'] ?? 'superadmin';
        $superadmin->setPassword(password_hash($password, \PASSWORD_BCRYPT));
        $this->addReference(self::REFERENCE_IDENTIFIER.'superadmin', $superadmin);

        return $superadmin;
    }

    public function getDependencies(): array
    {
        return [
            LanguageFixtures::class,
        ];
    }
}
