<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240627125940 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE student CHANGE cv cv VARCHAR(500) DEFAULT NULL, CHANGE letter letter VARCHAR(500) DEFAULT NULL');
        $this->addSql('ALTER TABLE user CHANGE pic pic VARCHAR(500) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user CHANGE pic pic VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE student CHANGE cv cv VARCHAR(255) DEFAULT NULL, CHANGE letter letter VARCHAR(255) DEFAULT NULL');
    }
}
