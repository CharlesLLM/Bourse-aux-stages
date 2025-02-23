<?php

namespace App\Entity;

use App\Entity\Traits\TimestampableTrait;
use App\Enum\LevelEnum;
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
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['offer', 'company'])]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotNull]
    #[Groups(['offer', 'company'])]
    private ?string $name = null;

    #[ORM\Column(type: 'boolean', options: ['default' => true])]
    #[Groups(['offer'])]
    private bool $active = true;

    #[ORM\Column(length: 20, enumType: OfferTypeEnum::class)]
    #[Assert\NotNull]
    #[Groups(['offer', 'companies', 'company'])]
    private ?OfferTypeEnum $type = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotNull]
    #[Groups(['offer', 'company'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotNull]
    #[Groups(['offer'])]
    private ?string $mission = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotNull]
    #[Groups(['offer'])]
    private ?string $requiredProfile = null;

    #[ORM\Column(enumType: PromoteStatusEnum::class, length: 10, nullable: true)]
    #[Groups(['offer'])]
    private ?PromoteStatusEnum $promoteStatus = null;

    #[ORM\Column(enumType: LevelEnum::class, length: 20)]
    #[Groups(['offer'])]
    private ?LevelEnum $requiredLevel = null;

    #[ORM\Column]
    #[Groups(['offer'])]
    private ?int $distance = null;

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

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['offer'])]
    private ?\DateTimeInterface $endPublicationDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['offer', 'company'])]
    private \DateTimeInterface $startDate;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['offer', 'company'])]
    private \DateTimeInterface $endDate;

    #[ORM\ManyToOne(inversedBy: 'offers')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['offer'])]
    private ?Company $company = null;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'offers')]
    #[Groups(['offer', 'company'])]
    private Collection $tags;

    #[ORM\OneToMany(mappedBy: 'offer', targetEntity: Application::class, orphanRemoval: true)]
    private Collection $applications;

    #[ORM\ManyToMany(targetEntity: Skill::class, mappedBy: 'offers')]
    #[Groups(['offer'])]
    private Collection $skills;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->applications = new ArrayCollection();
        $this->skills = new ArrayCollection();
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

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): static
    {
        $this->active = $active;

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

    public function getMission(): ?string
    {
        return $this->mission;
    }

    public function setMission(?string $mission): static
    {
        $this->mission = $mission;

        return $this;
    }

    public function getRequiredProfile(): ?string
    {
        return $this->requiredProfile;
    }

    public function setRequiredProfile(?string $requiredProfile): static
    {
        $this->requiredProfile = $requiredProfile;

        return $this;
    }

    public function isPromoteStatus(): ?PromoteStatusEnum
    {
        return $this->promoteStatus;
    }

    public function setPromoteStatus(?PromoteStatusEnum $promoteStatus): static
    {
        $this->promoteStatus = $promoteStatus;

        return $this;
    }

    public function getRequiredLevel(): ?LevelEnum
    {
        return $this->requiredLevel;
    }

    public function setRequiredLevel(LevelEnum $requiredLevel): static
    {
        $this->requiredLevel = $requiredLevel;

        return $this;
    }

    public function getDistance(): ?int
    {
        return $this->distance;
    }

    public function setDistance(int $distance): static
    {
        $this->distance = $distance;

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

    public function getEndPublicationDate(): ?\DateTimeInterface
    {
        return $this->endPublicationDate;
    }

    public function setEndPublicationDate(\DateTimeInterface $endPublicationDate): static
    {
        $this->endPublicationDate = $endPublicationDate;

        return $this;
    }

    public function getStartDate(): ?\DateTimeInterface
    {
        return $this->startDate;
    }

    public function setStartDate(\DateTimeInterface $startDate): static
    {
        $this->startDate = $startDate;

        return $this;
    }

    public function getEndDate(): ?\DateTimeInterface
    {
        return $this->endDate;
    }

    public function setEndDate(\DateTimeInterface $endDate): static
    {
        $this->endDate = $endDate;

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

    public function getApplications(): Collection
    {
        return $this->applications;
    }

    public function addApplication(Application $application): static
    {
        if (!$this->applications->contains($application)) {
            $this->applications->add($application);
            $application->setCompany($this);
        }

        return $this;
    }

    public function removeApplication(Application $application): static
    {
        if ($this->applications->removeElement($application)) {
            if ($application->getCompany() === $this) {
                $application->setCompany(null);
            }
        }

        return $this;
    }

    public function getSkills(): Collection
    {
        return $this->skills;
    }

    public function addSkill(Skill $skill): static
    {
        if (!$this->skills->contains($skill)) {
            $this->skills->add($skill);
            $skill->addOffer($this);
        }

        return $this;
    }

    public function removeSkill(Skill $skill): static
    {
        if ($this->skills->removeElement($skill)) {
            $skill->removeOffer($this);
        }

        return $this;
    }
}
