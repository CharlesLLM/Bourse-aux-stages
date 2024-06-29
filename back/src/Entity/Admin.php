<?php

namespace App\Entity;

use App\Entity\Traits\EnabledTrait;
use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AdminRepository::class)]
#[ORM\Table(name: '`admin`')]
#[ORM\HasLifecycleCallbacks]
class Admin
{
    use EnabledTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['company', 'admin', 'user_admin'])]
    private ?Uuid $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    #[Groups(['company', 'admin', 'user_admin'])]
    private ?string $position = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company', 'admin', 'user_admin'])]
    private ?string $linkedinLink = null;

    #[ORM\OneToOne(inversedBy: 'companyAdmin', targetEntity: User::class, cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['company', 'admin'])]
    private ?User $user = null;

    #[ORM\ManyToOne(targetEntity: Company::class, inversedBy: 'admins', cascade: ['persist'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['admin'])]
    private ?Company $company = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(string $position): static
    {
        $this->position = $position;

        return $this;
    }

    public function getLinkedinLink(): ?string
    {
        return $this->linkedinLink;
    }

    public function setLinkedinLink(?string $linkedinLink): static
    {
        $this->linkedinLink = $linkedinLink;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): static
    {
        $this->user = $user;

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
}
