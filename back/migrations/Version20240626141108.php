<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240626141108 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add application_language';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE application_language (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', application_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', language_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', level VARCHAR(20) NOT NULL, INDEX IDX_6BE0AEA63E030ACD (application_id), INDEX IDX_6BE0AEA682F1BAF4 (language_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE application_language ADD CONSTRAINT FK_6BE0AEA63E030ACD FOREIGN KEY (application_id) REFERENCES application (id)');
        $this->addSql('ALTER TABLE application_language ADD CONSTRAINT FK_6BE0AEA682F1BAF4 FOREIGN KEY (language_id) REFERENCES language (id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE application_language DROP FOREIGN KEY FK_6BE0AEA63E030ACD');
        $this->addSql('ALTER TABLE application_language DROP FOREIGN KEY FK_6BE0AEA682F1BAF4');
        $this->addSql('DROP TABLE application_language');
    }
}
