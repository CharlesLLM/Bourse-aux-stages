<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240427162403 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Delete timestamp and blame, change postal code from int to string, compagny to company and some field names';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE `admin` DROP FOREIGN KEY FK_880E0D761224ABE0');
        $this->addSql('CREATE TABLE company (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) NOT NULL, siret VARCHAR(255) NOT NULL, x_link VARCHAR(255) DEFAULT NULL, linkedin_link VARCHAR(255) DEFAULT NULL, created_by DATETIME DEFAULT NULL, updated_by DATETIME DEFAULT NULL, deleted_by DATETIME DEFAULT NULL, address VARCHAR(255) NOT NULL, postal_code VARCHAR(15) NOT NULL, city VARCHAR(50) NOT NULL, country VARCHAR(30) NOT NULL, created_at DATETIME DEFAULT NULL, updated_at DATETIME DEFAULT NULL, deleted_at DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('DROP TABLE compagny');
        $this->addSql('DROP INDEX IDX_880E0D761224ABE0 ON `admin`');
        $this->addSql('ALTER TABLE `admin` ADD company_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\', DROP compagny_id, DROP phone, DROP created_at, DROP updated_at, DROP deleted_at');
        $this->addSql('ALTER TABLE `admin` ADD CONSTRAINT FK_880E0D76979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('CREATE INDEX IDX_880E0D76979B1AD6 ON `admin` (company_id)');
        $this->addSql('ALTER TABLE student DROP created_at, DROP updated_at, DROP deleted_at, CHANGE country country VARCHAR(30) NOT NULL, CHANGE city city VARCHAR(50) NOT NULL, CHANGE postal_code postal_code VARCHAR(15) NOT NULL');
        $this->addSql('DROP INDEX UNIQ_IDENTIFIER_EMAIL ON user');
        $this->addSql('ALTER TABLE user ADD first_name VARCHAR(255) NOT NULL, ADD last_name VARCHAR(255) NOT NULL, ADD gender VARCHAR(10) NOT NULL, ADD phone VARCHAR(20) NOT NULL, DROP name, DROP firstname, CHANGE roles roles JSON NOT NULL, CHANGE created_at created_at DATETIME DEFAULT NULL, CHANGE updated_at updated_at DATETIME DEFAULT NULL, CHANGE deleted_at deleted_at DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE `admin` DROP FOREIGN KEY FK_880E0D76979B1AD6');
        $this->addSql('CREATE TABLE compagny (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, siret VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, address VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, country VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, postal_code INT NOT NULL, city VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, x_link VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, linkedin_link VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, deleted_at DATETIME DEFAULT \'NULL\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('DROP TABLE company');
        $this->addSql('ALTER TABLE student ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, ADD deleted_at DATETIME DEFAULT \'NULL\', CHANGE postal_code postal_code INT NOT NULL, CHANGE city city VARCHAR(255) NOT NULL, CHANGE country country VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user ADD name VARCHAR(255) NOT NULL, ADD firstname VARCHAR(255) NOT NULL, DROP first_name, DROP last_name, DROP gender, DROP phone, CHANGE roles roles LONGTEXT NOT NULL COLLATE `utf8mb4_bin`, CHANGE created_at created_at DATETIME NOT NULL, CHANGE updated_at updated_at DATETIME NOT NULL, CHANGE deleted_at deleted_at DATETIME DEFAULT \'NULL\'');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL ON user (email)');
        $this->addSql('DROP INDEX IDX_880E0D76979B1AD6 ON `admin`');
        $this->addSql('ALTER TABLE `admin` ADD compagny_id BINARY(16) DEFAULT \'NULL\' COMMENT \'(DC2Type:uuid)\', ADD phone VARCHAR(255) NOT NULL, ADD created_at DATETIME NOT NULL, ADD updated_at DATETIME NOT NULL, ADD deleted_at DATETIME DEFAULT \'NULL\', DROP company_id');
        $this->addSql('ALTER TABLE `admin` ADD CONSTRAINT FK_880E0D761224ABE0 FOREIGN KEY (compagny_id) REFERENCES compagny (id)');
        $this->addSql('CREATE INDEX IDX_880E0D761224ABE0 ON `admin` (compagny_id)');
    }
}
