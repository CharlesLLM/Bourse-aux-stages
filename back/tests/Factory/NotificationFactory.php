<?php

namespace App\Tests\Factory;

use App\Entity\Notification;
use Zenstruck\Foundry\ModelFactory;

final class NotificationFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();
    }

    protected function getDefaults(): array
    {
        return [
            'name' => self::faker()->text(255),
        ];
    }

    protected function initialize(): self
    {
        return $this;
    }

    protected static function getClass(): string
    {
        return Notification::class;
    }
}
