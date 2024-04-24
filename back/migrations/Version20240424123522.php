<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240424123522 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE compagny (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, siret VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, country VARCHAR(255) NOT NULL, postal_code VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, x_link VARCHAR(255) DEFAULT NULL, linkedin_link VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `admin` ADD compagny_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE `admin` ADD CONSTRAINT FK_880E0D761224ABE0 FOREIGN KEY (compagny_id) REFERENCES compagny (id)');
        $this->addSql('CREATE INDEX IDX_880E0D761224ABE0 ON `admin` (compagny_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `admin` DROP FOREIGN KEY FK_880E0D761224ABE0');
        $this->addSql('DROP TABLE compagny');
        $this->addSql('DROP INDEX IDX_880E0D761224ABE0 ON `admin`');
        $this->addSql('ALTER TABLE `admin` DROP compagny_id');
    }
}
