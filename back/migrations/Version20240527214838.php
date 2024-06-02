<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240527214838 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create request table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE request (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, type VARCHAR(20) NOT NULL, description VARCHAR(255) NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_3B978F9FCB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE request ADD CONSTRAINT FK_3B978F9FCB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE request DROP FOREIGN KEY FK_3B978F9FCB944F1A');
        $this->addSql('DROP TABLE request');
    }
}
