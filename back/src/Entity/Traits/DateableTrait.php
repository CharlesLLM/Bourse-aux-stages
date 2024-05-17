<?php

namespace App\Entity\Traits;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\DBAL\Types\Types;

trait DateableTrait
{
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    protected \DateTime $startDate;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    protected \DateTime $endDate;

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
}
