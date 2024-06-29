<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240627090904 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add facebook_link and instagram_link to company';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company ADD facebook_link VARCHAR(255) DEFAULT NULL, ADD instagram_link VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company DROP facebook_link, DROP instagram_link');
    }
}
