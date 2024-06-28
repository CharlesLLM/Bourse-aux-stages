<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240626141108 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE application_language (id INT AUTO_INCREMENT NOT NULL, application_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', language_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', level VARCHAR(20) NOT NULL, INDEX IDX_6BE0AEA63E030ACD (application_id), INDEX IDX_6BE0AEA682F1BAF4 (language_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE application_language ADD CONSTRAINT FK_6BE0AEA63E030ACD FOREIGN KEY (application_id) REFERENCES application (id)');
        $this->addSql('ALTER TABLE application_language ADD CONSTRAINT FK_6BE0AEA682F1BAF4 FOREIGN KEY (language_id) REFERENCES language (id)');
        $this->addSql('ALTER TABLE application ADD language_level VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE application_language DROP FOREIGN KEY FK_6BE0AEA63E030ACD');
        $this->addSql('ALTER TABLE application_language DROP FOREIGN KEY FK_6BE0AEA682F1BAF4');
        $this->addSql('DROP TABLE application_language');
        $this->addSql('ALTER TABLE application DROP language_level');
    }
}
