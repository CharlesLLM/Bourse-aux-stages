<?php

namespace App\Entity;

use App\Entity\Traits\BlameableTrait;
use App\Entity\Traits\EnabledTrait;
use App\Entity\Traits\LocatableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Repository\CompanyRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CompanyRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Company
{
    use BlameableTrait;
    use EnabledTrait;
    use LocatableTrait;
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['companies', 'company', 'offer'])]
    private ?Uuid $id = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Groups(['companies', 'company', 'offer'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['companies', 'company'])]
    private ?string $slug = null;

    #[ORM\Column(length: 20)]
    #[Assert\NotBlank]
    #[Assert\Regex(pattern: '/^\d{3}\s\d{3}\s\d{3}\s\d{5}$/')]
    #[Groups(['offer'])]
    private ?string $siret = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['companies', 'company'])]
    private ?string $summary = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['company'])]
    private ?string $description = null;

    #[ORM\Column]
    #[Groups(['companies', 'company'])]
    private ?int $size = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company'])]
    private ?string $websiteLink = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company'])]
    private ?string $websiteLinkLabel = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company', 'offer'])]
    private ?string $xLink = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['company', 'offer'])]
    private ?string $linkedinLink = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['companies', 'company'])]
    private ?float $latitude = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['companies', 'company'])]
    private ?float $longitude = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['companies', 'company'])]
    private ?string $logo = null;

    #[ORM\ManyToOne(targetEntity: CompanyCategory::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['companies', 'company'])]
    private CompanyCategory $category;

    #[ORM\OneToMany(mappedBy: 'company', targetEntity: Admin::class)]
    private Collection $admins;

    #[ORM\OneToMany(mappedBy: 'company', targetEntity: Offer::class, orphanRemoval: true)]
    #[Groups(['companies', 'company'])]
    private Collection $offers;

    #[ORM\OneToMany(mappedBy: 'company', targetEntity: Application::class)]
    private Collection $applications;

    #[ORM\OneToMany(mappedBy: 'company', targetEntity: SpontaneousApplication::class)]
    private Collection $spontaneousApplications;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'companies')]
    #[Groups(['companies', 'company'])]
    private Collection $tags;

    public function __construct()
    {
        $this->admins = new ArrayCollection();
        $this->offers = new ArrayCollection();
        $this->applications = new ArrayCollection();
        $this->spontaneousApplications = new ArrayCollection();
        $this->tags = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->name ?? '';
    }

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

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function getSiret(): ?string
    {
        return $this->siret;
    }

    public function setSiret(string $siret): static
    {
        $this->siret = $siret;

        return $this;
    }

    public function getSummary(): ?string
    {
        return $this->summary;
    }

    public function setSummary(string $summary): static
    {
        $this->summary = $summary;

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

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(int $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getWebsiteLink(): ?string
    {
        return $this->websiteLink;
    }

    public function setWebsiteLink(?string $websiteLink): static
    {
        $this->websiteLink = $websiteLink;

        return $this;
    }

    public function getWebsiteLinkLabel(): ?string
    {
        return $this->websiteLinkLabel;
    }

    public function setWebsiteLinkLabel(?string $websiteLinkLabel): static
    {
        $this->websiteLinkLabel = $websiteLinkLabel;

        return $this;
    }

    public function getXLink(): ?string
    {
        return $this->xLink;
    }

    public function setXLink(?string $xLink): static
    {
        $this->xLink = $xLink;

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

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getLogo(): ?string
    {
        return $this->logo;
    }

    public function setLogo(?string $logo): static
    {
        $this->logo = $logo;

        return $this;
    }

    public function getCategory(): ?CompanyCategory
    {
        return $this->category;
    }

    public function setCategory(?CompanyCategory $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getAdmins(): Collection
    {
        return $this->admins;
    }

    public function addAdmin(Admin $admin): static
    {
        if (!$this->admins->contains($admin)) {
            $this->admins->add($admin);
            $admin->setCompany($this);
        }

        return $this;
    }

    public function removeAdmin(Admin $admin): static
    {
        if ($this->admins->removeElement($admin)) {
            if ($admin->getCompany() === $this) {
                $admin->setCompany(null);
            }
        }

        return $this;
    }

    public function getOffers(): Collection
    {
        return $this->offers;
    }

    public function addOffer(Offer $offer): static
    {
        if (!$this->offers->contains($offer)) {
            $this->offers->add($offer);
            $offer->setCompany($this);
        }

        return $this;
    }

    public function removeOffer(Offer $offer): static
    {
        if ($this->offers->removeElement($offer)) {
            if ($offer->getCompany() === $this) {
                $offer->setCompany(null);
            }
        }

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

    public function getSpontaneousApplications(): Collection
    {
        return $this->spontaneousApplications;
    }

    public function addSpontaneousApplication(SpontaneousApplication $spontaneousApplication): static
    {
        if (!$this->spontaneousApplications->contains($spontaneousApplication)) {
            $this->spontaneousApplications->add($spontaneousApplication);
            $spontaneousApplication->setCompany($this);
        }

        return $this;
    }

    public function removeSpontaneousApplication(SpontaneousApplication $spontaneousApplication): static
    {
        if ($this->spontaneousApplications->removeElement($spontaneousApplication)) {
            if ($spontaneousApplication->getCompany() === $this) {
                $spontaneousApplication->setCompany(null);
            }
        }

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

    public function slugify(string $text): string
    {
        return preg_replace('/\s+/', '-', mb_strtolower(trim(strip_tags($text)), 'UTF-8'));
    }

    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    public function updateSlug(): void
    {
        if (null === $this->slug) {
            $this->slug = $this->slugify($this->name);
        }
    }
}
