<?php

namespace App\Entity\Traits;

use Doctrine\ORM\Mapping as ORM;

trait EnabledTrait
{
    #[ORM\Column(type: 'boolean')]
    private bool $enabled = false;

    public function getEnabled(): bool
    {
        return $this->enabled;
    }

    public function setEnabled(bool $enabled): static
    {
        $this->enabled = $enabled;

        return $this;
    }
}
