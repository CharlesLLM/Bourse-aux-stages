<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240607081548 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change company description to not nullable';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company CHANGE description description LONGTEXT NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company CHANGE description description LONGTEXT DEFAULT NULL');
    }
}
