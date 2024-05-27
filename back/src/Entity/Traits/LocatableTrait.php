<?php

namespace App\Entity\Traits;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

trait LocatableTrait
{
    #[ORM\Column(length: 255)]
    #[Groups(['offer', 'student'])]
    private ?string $address = null;

    #[ORM\Column(length: 50, nullable: true)]
    private ?string $additionalAddress = null;

    #[ORM\Column(length: 15)]
    #[Groups(['offer', 'student', 'request'])]
    private ?string $postalCode = null;

    #[ORM\Column(length: 50)]
    #[Groups(['offer', 'student', 'request'])]
    private ?string $city = null;

    #[ORM\Column(length: 100)]
    #[Groups(['offer', 'student', 'request'])]
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
