<?php

namespace App\DataFixtures;

use App\Entity\Student;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class StudentFixtures extends Fixture implements DependentFixtureInterface
{
    public const array DATA = [
        [
            'user' => 'user_1',
            'address' => '1 rue de la Paix',
            'postalCode' => '75000',
            'city' => 'Paris',
            'country' => 'France',
        ],
    ];

    public function load(ObjectManager $manager)
    {
        foreach (self::DATA as $key => $item) {
            $student = $this->processStudent($item);
            $manager->persist($student);

            ++$key;
            $this->addReference('student_'.$key, $student);
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

        return $student;
    }

    public function getDependencies()
    {
        return [
            UserFixtures::class,
        ];
    }
}
