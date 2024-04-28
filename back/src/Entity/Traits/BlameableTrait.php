<?php

namespace App\Entity\Traits;

use App\Entity\User;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

trait BlameableTrait
{
    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    protected User $createdBy;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    protected User $updatedBy;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    protected User $deletedBy;

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(User $createdBy): static
    {
        $this->createdBy = $createdBy;

        return $this;
    }

    public function getUpdatedBy(): ?User
    {
        return $this->updatedBy;
    }

    public function setUpdatedBy(User $updatedBy): static
    {
        $this->updatedBy = $updatedBy;

        return $this;
    }

    public function getDeletedBy(): ?User
    {
        return $this->deletedBy;
    }

    public function setDeletedBy(User $deletedBy): static
    {
        $this->deletedBy = $deletedBy;

        return $this;
    }
}
