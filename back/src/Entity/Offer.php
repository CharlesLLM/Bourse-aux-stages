<?php

namespace App\Entity;

use App\Entity\Traits\DateableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Enum\OfferTypeEnum;
use App\Enum\PromoteStatusEnum;
use App\Repository\OfferRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: OfferRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Offer
{
    use DateableTrait;
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['offer'])]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotNull]
    #[Groups(['offer'])]
    private ?string $name = null;

    #[ORM\Column(length: 20, enumType: OfferTypeEnum::class)]
    #[Assert\NotNull]
    #[Groups(['companies', 'company', 'offer'])]
    private ?OfferTypeEnum $type = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotNull]
    #[Groups(['offer'])]
    private ?string $description = null;

    #[ORM\Column(enumType: PromoteStatusEnum::class, length: 10, nullable: true)]
    #[Groups(['offer'])]
    private ?PromoteStatusEnum $promoteStatus = null;

    #[ORM\Column]
    #[Assert\NotNull]
    #[Groups(['offer'])]
    private ?float $revenue = null;

    #[ORM\Column]
    #[Groups(['offer'])]
    private bool $remote = false;

    #[ORM\Column]
    #[Groups(['offer'])]
    private ?int $availablePlaces = null;

    #[ORM\ManyToOne(inversedBy: 'offers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['offer'])]
    private ?Company $company = null;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'offers')]
    #[Groups(['offer'])]
    private Collection $tags;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
    }

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

    public function getType(): ?OfferTypeEnum
    {
        return $this->type;
    }

    public function setType(?OfferTypeEnum $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function isPromoteStatus(): PromoteStatusEnum
    {
        return $this->promoteStatus;
    }

    public function setPromoteStatus(PromoteStatusEnum $promoteStatus): static
    {
        $this->promoteStatus = $promoteStatus;

        return $this;
    }

    public function getRevenue(): ?float
    {
        return $this->revenue;
    }

    public function setRevenue(float $revenue): static
    {
        $this->revenue = $revenue;

        return $this;
    }

    public function isRemote(): bool
    {
        return $this->remote;
    }

    public function setRemote(bool $remote): static
    {
        $this->remote = $remote;

        return $this;
    }

    public function getAvailablePlaces(): ?int
    {
        return $this->availablePlaces;
    }

    public function setAvailablePlaces(int $availablePlaces): static
    {
        $this->availablePlaces = $availablePlaces;

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

    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function setTags(Collection $tags): static
    {
        $this->tags = $tags;

        return $this;
    }

    public function addTag(Tag $tag): static
    {
        if (!$this->tags->contains($tag)) {
            $this->tags->add($tag);
        }

        return $this;
    }

    public function removeTag(Tag $tag): static
    {
        $this->tags->removeElement($tag);

        return $this;
    }
}
