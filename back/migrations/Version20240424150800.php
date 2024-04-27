<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240424150800 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `admin` CHANGE deleted_at deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE compagny ADD deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE student CHANGE deleted_at deleted_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE deleted_at deleted_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user CHANGE deleted_at deleted_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE `admin` CHANGE deleted_at deleted_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE student CHANGE deleted_at deleted_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE compagny DROP deleted_at');
    }
}
