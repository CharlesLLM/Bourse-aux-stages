<?php

namespace App\Entity;

use App\Entity\Traits\DateableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Enum\LevelEnum;
use App\Repository\FormationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: FormationRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Formation
{
    use DateableTrait;
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotNull]
    #[Groups(['application', 'user_student', 'student'])]
    private ?string $name = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotNull]
    #[Groups(['application', 'user_student', 'student'])]
    private ?string $schoolName = null;

    #[ORM\Column(enumType: LevelEnum::class, length: 20)]
    #[Assert\NotNull]
    #[Groups(['application', 'user_student', 'student'])]
    private ?LevelEnum $level = null;

    #[ORM\ManyToOne(inversedBy: 'formations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Student $student = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getSchoolName(): ?string
    {
        return $this->schoolName;
    }

    public function setSchoolName(?string $schoolName): static
    {
        $this->schoolName = $schoolName;

        return $this;
    }

    public function getLevel(): ?LevelEnum
    {
        return $this->level;
    }

    public function setLevel(?LevelEnum $level): static
    {
        $this->level = $level;

        return $this;
    }

    public function getStudent(): ?Student
    {
        return $this->student;
    }

    public function setStudent(?Student $student): static
    {
        $this->student = $student;

        return $this;
    }
}
