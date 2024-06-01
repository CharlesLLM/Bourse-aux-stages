<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240601121809 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change tag id to Uuid, add company_category, company size and company slug, and set admin company to not null';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company_tag DROP FOREIGN KEY FK_77A33EBBAD26311');
        $this->addSql('ALTER TABLE offer_tag DROP FOREIGN KEY FK_2FBCD61BBAD26311');
        $this->addSql('ALTER TABLE company_tag CHANGE tag_id tag_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE offer_tag CHANGE tag_id tag_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE tag CHANGE id id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE company_tag ADD CONSTRAINT FK_77A33EBBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_tag ADD CONSTRAINT FK_2FBCD61BBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('CREATE TABLE company_category (id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', name VARCHAR(50) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE company ADD slug VARCHAR(255) NOT NULL, ADD size INT NOT NULL, ADD website_link VARCHAR(255) DEFAULT NULL, ADD website_link_label VARCHAR(255) DEFAULT NULL, ADD category_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE company ADD CONSTRAINT FK_4FBF094F12469DE2 FOREIGN KEY (category_id) REFERENCES company_category (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4FBF094F989D9B62 ON company (slug)');
        $this->addSql('CREATE INDEX IDX_4FBF094F12469DE2 ON company (category_id)');
        $this->addSql('ALTER TABLE admin CHANGE company_id company_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company_tag DROP FOREIGN KEY FK_77A33EBBAD26311');
        $this->addSql('ALTER TABLE offer_tag DROP FOREIGN KEY FK_2FBCD61BBAD26311');
        $this->addSql('ALTER TABLE tag CHANGE id id INT AUTO_INCREMENT NOT NULL');
        $this->addSql('ALTER TABLE offer_tag CHANGE tag_id tag_id INT NOT NULL');
        $this->addSql('ALTER TABLE company_tag CHANGE tag_id tag_id INT NOT NULL');
        $this->addSql('ALTER TABLE company_tag ADD CONSTRAINT FK_77A33EBBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_tag ADD CONSTRAINT FK_2FBCD61BBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company DROP FOREIGN KEY FK_4FBF094F12469DE2');
        $this->addSql('DROP INDEX UNIQ_4FBF094F989D9B62 ON company');
        $this->addSql('DROP INDEX IDX_4FBF094F12469DE2 ON company');
        $this->addSql('ALTER TABLE company DROP slug, DROP size, DROP website_link, DROP website_link_label, DROP category_id');
        $this->addSql('DROP TABLE company_category');
        $this->addSql('ALTER TABLE admin CHANGE company_id company_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\'');
    }
}
