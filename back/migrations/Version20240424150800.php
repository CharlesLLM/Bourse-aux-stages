<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240424150800 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change deleted_at to nullable in all entities';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE `admin` CHANGE deleted_at deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE compagny ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE student CHANGE deleted_at deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE deleted_at deleted_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user CHANGE deleted_at deleted_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE `admin` CHANGE deleted_at deleted_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE student CHANGE deleted_at deleted_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE compagny DROP deleted_at');
    }
}
