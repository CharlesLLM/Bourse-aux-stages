<?php

namespace App\Entity;

use App\Entity\Traits\DateableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Enum\OfferTypeEnum;
use App\Repository\RequestRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RequestRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Request
{

    use DateableTrait;
    use TimestampableTrait;
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['request'])] // Définir le groupe pour l'id
    private ?Uuid $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['request'])] // Définir le groupe pour le nom
    private ?string $name = null;

    #[ORM\Column(length: 20, enumType: OfferTypeEnum::class)]
    #[Assert\NotNull]
    #[Groups(['request'])] // Définir le groupe pour le type
    private ?OfferTypeEnum $type = null;

    #[ORM\Column(length: 255)]
    #[Groups(['request'])] // Définir le groupe pour la description
    private ?string $description = null;

    #[ORM\ManyToOne(inversedBy: 'requests')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['request'])] // Définir le groupe pour l'association avec Student
    private ?Student $student = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getType(): ?OfferTypeEnum
    {
        return $this->type;
    }

    public function setType(OfferTypeEnum $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

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
