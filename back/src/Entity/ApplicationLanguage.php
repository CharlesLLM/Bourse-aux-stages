<?php

namespace App\Entity;

use App\Enum\LanguageLevelEnum;
use App\Repository\ApplicationLanguageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\IdGenerator\UuidGenerator;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ApplicationLanguageRepository::class)]
class ApplicationLanguage
{
    #[ORM\Id]
    #[ORM\Column(type: UuidType::NAME, unique: true)]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\CustomIdGenerator(class: UuidGenerator::class)]
    #[Groups(['request', 'application', 'user_student'])]
    private ?Uuid $id = null;

    #[ORM\Column(length: 20, enumType: LanguageLevelEnum::class)]
    #[Assert\NotNull]
    #[Groups(['offer', 'companies', 'company'])]
    private ?LanguageLevelEnum $level = null;

    #[ORM\ManyToOne(inversedBy: 'Language')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Application $application = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Language $language = null;

    public function getId(): ?Uuid
    {
        return $this->id;
    }

    public function getApplication(): ?Application
    {
        return $this->application;
    }

    public function setApplication(?Application $application): static
    {
        $this->application = $application;

        return $this;
    }

    public function getLanguage(): ?Language
    {
        return $this->language;
    }

    public function setLanguage(?Language $language): static
    {
        $this->language = $language;

        return $this;
    }

    public function getLevel(): ?LanguageLevelEnum
    {
        return $this->level;
    }

    public function setLevel(?LanguageLevelEnum $level): static
    {
        $this->level = $level;

        return $this;
    }
}
