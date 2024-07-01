<?php

namespace App\Entity\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

trait LocatableTrait
{
    #[ORM\Column(length: 255)]
    #[Groups(['company', 'offer', 'student', 'user'])]
    private ?string $address = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(['company', 'student', 'user_student'])]
    private ?string $additionalAddress = null;

    #[ORM\Column(length: 15)]
    #[Assert\Regex(pattern: '/^\d{5}$/')]
    #[Groups(['company', 'offer', 'student', 'request', 'user_student'])]
    private ?string $postalCode = null;

    #[ORM\Column(length: 50)]
    #[Groups(['company', 'offer', 'student', 'request', 'user_student'])]
    private ?string $city = null;

    #[ORM\Column(length: 100)]
    #[Assert\Country]
    #[Groups(['company', 'offer', 'student', 'request', 'user_student'])]
    private ?string $country = null;

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getAdditionalAddress(): ?string
    {
        return $this->additionalAddress;
    }

    public function setAdditionalAddress(?string $additionalAddress): static
    {
        $this->additionalAddress = $additionalAddress;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): static
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getCountry(): ?string
    {
        return $this->country;
    }

    public function setCountry(string $country): static
    {
        $this->country = $country;

        return $this;
    }
}
