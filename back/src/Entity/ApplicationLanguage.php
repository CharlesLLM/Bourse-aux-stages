<?php

namespace App\Entity;

use App\Enum\LanguageLevelEnum;
use App\Repository\ApplicationLanguageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ApplicationLanguageRepository::class)]
class ApplicationLanguage
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 20, enumType: LanguageLevelEnum::class)]
    #[Assert\NotNull]
    #[Groups(['offer', 'companies', 'company'])]
    private ?LanguageLevelEnum $level = null;

    #[ORM\ManyToOne(inversedBy: 'Language')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Application $Application = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Language $Language = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getApplication(): ?Application
    {
        return $this->Application;
    }

    public function setApplication(?Application $Application): static
    {
        $this->Application = $Application;

        return $this;
    }

    public function getLanguage(): ?Language
    {
        return $this->Language;
    }

    public function setLanguage(?Language $Language): static
    {
        $this->Language = $Language;

        return $this;
    }
    public function getLevel(): ?LanguageLevelEnum
    {
        return $this->level;
    }

    public function setLevel(?LanguageLevelEnum $level): void
    {
        $this->level = $level;
    }
}
