<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240517084211 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add enabled column to user, company and admin tables, and create experience, formation, hobby and skill tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE experience (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', company_name VARCHAR(255) NOT NULL, position VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_590C103CB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE formation (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, school_name VARCHAR(100) NOT NULL, level VARCHAR(20) NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_404021BFCB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE hobby (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_3964F337CB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_5E3DE477CB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE experience ADD CONSTRAINT FK_590C103CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE formation ADD CONSTRAINT FK_404021BFCB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE hobby ADD CONSTRAINT FK_3964F337CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE477CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE admin ADD enabled TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE company ADD enabled TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE user ADD enabled TINYINT(1) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE experience DROP FOREIGN KEY FK_590C103CB944F1A');
        $this->addSql('ALTER TABLE formation DROP FOREIGN KEY FK_404021BFCB944F1A');
        $this->addSql('ALTER TABLE hobby DROP FOREIGN KEY FK_3964F337CB944F1A');
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY FK_5E3DE477CB944F1A');
        $this->addSql('DROP TABLE experience');
        $this->addSql('DROP TABLE formation');
        $this->addSql('DROP TABLE hobby');
        $this->addSql('DROP TABLE skill');
        $this->addSql('ALTER TABLE user DROP enabled');
        $this->addSql('ALTER TABLE company DROP enabled');
        $this->addSql('ALTER TABLE `admin` DROP enabled');
    }
}
