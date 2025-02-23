<?php

namespace App\DataFixtures;

use App\Entity\Student;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class StudentFixtures extends Fixture implements DependentFixtureInterface
{
    public const REFERENCE_IDENTIFIER = 'student_';
    public const FIXTURE_RANGE = 1;
    public const DATA = [
        [
            'user' => 'user_1',
            'address' => '1 rue de la Paix',
            'postalCode' => '75000',
            'city' => 'Paris',
            'country' => 'France',
        ],
    ];

    public function load(ObjectManager $manager): void
    {
        foreach (self::DATA as $key => $item) {
            $student = $this->processStudent($item);
            $manager->persist($student);

            ++$key;
            $this->addReference(self::REFERENCE_IDENTIFIER.$key, $student);
        }

        $manager->flush();
    }

    public function processStudent(array $data): Student
    {
        $student = new Student();
        $student->setUser($this->getReference($data['user']))
            ->setAddress($data['address'])
            ->setPostalCode($data['postalCode'])
            ->setCity($data['city'])
            ->setCountry($data['country'])
        ;
        $student->getUser()->addRole('ROLE_STUDENT');

        return $student;
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
