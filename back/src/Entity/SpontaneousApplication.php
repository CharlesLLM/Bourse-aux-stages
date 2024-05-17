<?php

namespace App\Entity;

use App\Entity\Traits\DateableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Enum\ApplicationStatusEnum;
use App\Repository\SpontaneousApplicationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: SpontaneousApplicationRepository::class)]
#[ORM\HasLifecycleCallbacks]
class SpontaneousApplication
{
    use DateableTrait;
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(enumType: ApplicationStatusEnum::class, length: 10)]
    #[Assert\NotNull]
    private ?ApplicationStatusEnum $status = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $motivationLetter = null;

    #[ORM\ManyToOne(inversedBy: 'spontaneousApplications')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Company $company = null;

    #[ORM\ManyToOne(inversedBy: 'spontaneousApplications')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Student $student = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStatus(): ?ApplicationStatusEnum
    {
        return $this->status;
    }

    public function setStatus(?ApplicationStatusEnum $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getMotivationLetter(): ?string
    {
        return $this->motivationLetter;
    }

    public function setMotivationLetter(?string $motivationLetter): static
    {
        $this->motivationLetter = $motivationLetter;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

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
