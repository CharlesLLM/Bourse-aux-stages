<?php

namespace App\Entity;

use App\Entity\Traits\TimestampableTrait;
use App\Enum\ApplicationStatusEnum;
use App\Repository\ApplicationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ApplicationRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Application
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['student', 'application'])]
    private ?Uuid $id = null;

    #[ORM\Column(enumType: ApplicationStatusEnum::class, length: 10)]
    #[Assert\NotNull]
    private ?ApplicationStatusEnum $status = null;

    #[ORM\Column(length: 500, nullable: true)]
    #[Groups(['student', 'application'])]
    private ?string $otherFile = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['student', 'application'])]
    private ?string $motivationLetter = null;

    #[ORM\ManyToOne(cascade: ['persist'], inversedBy: 'applications')]
    #[ORM\JoinColumn(nullable: false, )]
    #[Groups(['student', 'application'])]
    private ?Student $student = null;

    #[ORM\ManyToOne(inversedBy: 'applications')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['student', 'application'])]
    private ?Offer $offer = null;

    /**
     * @var Collection<int, ApplicationLanguage>
     */
    #[ORM\OneToMany(mappedBy: 'Application', targetEntity: ApplicationLanguage::class, orphanRemoval: true)]
    #[Groups(['student', 'application'])]
    private Collection $Languages;

    public function __construct()
    {
        $this->Languages = new ArrayCollection();
    }

    public function getId(): ?Uuid
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

    public function getStudent(): ?Student
    {
        return $this->student;
    }

    public function setStudent(?Student $student): static
    {
        $this->student = $student;

        return $this;
    }

    public function getOffer(): ?Offer
    {
        return $this->offer;
    }

    public function setOffer(?Offer $offer): static
    {
        $this->offer = $offer;

        return $this;
    }

    /**
     * @return Collection<int, ApplicationLanguage>
     */
    public function getLanguage(): Collection
    {
        return $this->Languages;
    }

    public function addLanguage(ApplicationLanguage $language): static
    {
        if (!$this->Languages->contains($language)) {
            $this->Languages->add($language);
            $language->setApplication($this);
        }

        return $this;
    }

    public function removeLanguage(ApplicationLanguage $language): static
    {
        if ($this->Languages->removeElement($language)) {
            // set the owning side to null (unless already changed)
            if ($language->getApplication() === $this) {
                $language->setApplication(null);
            }
        }

        return $this;
    }

    public function getLanguages(): ArrayCollection
    {
        return $this->Languages;
    }

    public function setLanguages(ArrayCollection $languages): void
    {
        $this->Languages = $languages;
    }

    public function getOtherFile(): ?string
    {
        return $this->otherFile;
    }

    public function setOtherFile(?string $otherFile): void
    {
        $this->otherFile = $otherFile;
    }

}
