<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240517092008 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add language and notification tables, and update some field lengths.';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE language (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(30) NOT NULL, code VARCHAR(5) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notification (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notification_user (notification_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', user_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', INDEX IDX_35AF9D73EF1A9D84 (notification_id), INDEX IDX_35AF9D73A76ED395 (user_id), PRIMARY KEY(notification_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE notification_user ADD CONSTRAINT FK_35AF9D73EF1A9D84 FOREIGN KEY (notification_id) REFERENCES notification (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE notification_user ADD CONSTRAINT FK_35AF9D73A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE admin CHANGE position position VARCHAR(100) NOT NULL');
        $this->addSql('ALTER TABLE company CHANGE siret siret VARCHAR(20) NOT NULL');
        $this->addSql('ALTER TABLE experience CHANGE position position VARCHAR(100) NOT NULL');
        $this->addSql('ALTER TABLE user ADD language_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', CHANGE first_name first_name VARCHAR(50) NOT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64982F1BAF4 FOREIGN KEY (language_id) REFERENCES language (id)');
        $this->addSql('CREATE INDEX IDX_8D93D64982F1BAF4 ON user (language_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64982F1BAF4');
        $this->addSql('ALTER TABLE notification_user DROP FOREIGN KEY FK_35AF9D73EF1A9D84');
        $this->addSql('ALTER TABLE notification_user DROP FOREIGN KEY FK_35AF9D73A76ED395');
        $this->addSql('DROP TABLE language');
        $this->addSql('DROP TABLE notification');
        $this->addSql('DROP TABLE notification_user');
        $this->addSql('DROP INDEX IDX_8D93D64982F1BAF4 ON user');
        $this->addSql('ALTER TABLE user DROP language_id, CHANGE first_name first_name VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE company CHANGE siret siret VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE `admin` CHANGE position position VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE experience CHANGE position position VARCHAR(255) NOT NULL');
    }
}
