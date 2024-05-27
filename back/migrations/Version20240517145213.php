<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240517145213 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `admin` (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', user_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', company_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', position VARCHAR(100) NOT NULL, enabled TINYINT(1) NOT NULL, UNIQUE INDEX UNIQ_880E0D76A76ED395 (user_id), INDEX IDX_880E0D76979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE application (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', company_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', status VARCHAR(10) NOT NULL, motivation_letter LONGTEXT DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_A45BDDC1CB944F1A (student_id), INDEX IDX_A45BDDC1979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE company (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, siret VARCHAR(20) NOT NULL, x_link VARCHAR(255) DEFAULT NULL, linkedin_link VARCHAR(255) DEFAULT NULL, created_by DATETIME DEFAULT NULL, updated_by DATETIME DEFAULT NULL, deleted_by DATETIME DEFAULT NULL, enabled TINYINT(1) NOT NULL, address VARCHAR(255) NOT NULL, postal_code VARCHAR(15) NOT NULL, city VARCHAR(50) NOT NULL, country VARCHAR(30) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE experience (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', company_name VARCHAR(255) NOT NULL, position VARCHAR(100) NOT NULL, description LONGTEXT NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_590C103CB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE formation (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, school_name VARCHAR(100) NOT NULL, level VARCHAR(20) NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_404021BFCB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE hobby (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_3964F337CB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE language (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(30) NOT NULL, code VARCHAR(5) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notification (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE notification_user (notification_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', user_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', INDEX IDX_35AF9D73EF1A9D84 (notification_id), INDEX IDX_35AF9D73A76ED395 (user_id), PRIMARY KEY(notification_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE offer (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', company_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, type VARCHAR(20) NOT NULL, description LONGTEXT NOT NULL, promote TINYINT(1) NOT NULL, revenue DOUBLE PRECISION NOT NULL, remote TINYINT(1) NOT NULL, available_places INT NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_29D6873E979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_5E3DE477CB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE spontaneous_application (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', company_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', status VARCHAR(10) NOT NULL, motivation_letter LONGTEXT DEFAULT NULL, start_date DATETIME DEFAULT NULL, end_date DATETIME DEFAULT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_E66FE685979B1AD6 (company_id), INDEX IDX_E66FE685CB944F1A (student_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE student (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', user_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', address VARCHAR(255) NOT NULL, postal_code VARCHAR(15) NOT NULL, city VARCHAR(50) NOT NULL, country VARCHAR(30) NOT NULL, UNIQUE INDEX UNIQ_B723AF33A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', language_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', first_name VARCHAR(50) NOT NULL, last_name VARCHAR(255) NOT NULL, gender VARCHAR(10) NOT NULL, email VARCHAR(180) NOT NULL, phone VARCHAR(20) NOT NULL, password VARCHAR(255) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', enabled TINYINT(1) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, INDEX IDX_8D93D64982F1BAF4 (language_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `admin` ADD CONSTRAINT FK_880E0D76A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE `admin` ADD CONSTRAINT FK_880E0D76979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE application ADD CONSTRAINT FK_A45BDDC1CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE application ADD CONSTRAINT FK_A45BDDC1979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE experience ADD CONSTRAINT FK_590C103CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE formation ADD CONSTRAINT FK_404021BFCB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE hobby ADD CONSTRAINT FK_3964F337CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE notification_user ADD CONSTRAINT FK_35AF9D73EF1A9D84 FOREIGN KEY (notification_id) REFERENCES notification (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE notification_user ADD CONSTRAINT FK_35AF9D73A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer ADD CONSTRAINT FK_29D6873E979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE477CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE spontaneous_application ADD CONSTRAINT FK_E66FE685979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE spontaneous_application ADD CONSTRAINT FK_E66FE685CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D64982F1BAF4 FOREIGN KEY (language_id) REFERENCES language (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `admin` DROP FOREIGN KEY FK_880E0D76A76ED395');
        $this->addSql('ALTER TABLE `admin` DROP FOREIGN KEY FK_880E0D76979B1AD6');
        $this->addSql('ALTER TABLE application DROP FOREIGN KEY FK_A45BDDC1CB944F1A');
        $this->addSql('ALTER TABLE application DROP FOREIGN KEY FK_A45BDDC1979B1AD6');
        $this->addSql('ALTER TABLE experience DROP FOREIGN KEY FK_590C103CB944F1A');
        $this->addSql('ALTER TABLE formation DROP FOREIGN KEY FK_404021BFCB944F1A');
        $this->addSql('ALTER TABLE hobby DROP FOREIGN KEY FK_3964F337CB944F1A');
        $this->addSql('ALTER TABLE notification_user DROP FOREIGN KEY FK_35AF9D73EF1A9D84');
        $this->addSql('ALTER TABLE notification_user DROP FOREIGN KEY FK_35AF9D73A76ED395');
        $this->addSql('ALTER TABLE offer DROP FOREIGN KEY FK_29D6873E979B1AD6');
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY FK_5E3DE477CB944F1A');
        $this->addSql('ALTER TABLE spontaneous_application DROP FOREIGN KEY FK_E66FE685979B1AD6');
        $this->addSql('ALTER TABLE spontaneous_application DROP FOREIGN KEY FK_E66FE685CB944F1A');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF33A76ED395');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D64982F1BAF4');
        $this->addSql('DROP TABLE `admin`');
        $this->addSql('DROP TABLE application');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP TABLE experience');
        $this->addSql('DROP TABLE formation');
        $this->addSql('DROP TABLE hobby');
        $this->addSql('DROP TABLE language');
        $this->addSql('DROP TABLE notification');
        $this->addSql('DROP TABLE notification_user');
        $this->addSql('DROP TABLE offer');
        $this->addSql('DROP TABLE skill');
        $this->addSql('DROP TABLE spontaneous_application');
        $this->addSql('DROP TABLE student');
        $this->addSql('DROP TABLE user');
    }
}
