<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240527211546 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add tag table with relations, add summary, description, latitude and longitude to company table, and add additional_address to company and student tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE company_tag (company_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', tag_id INT NOT NULL, INDEX IDX_77A33EB979B1AD6 (company_id), INDEX IDX_77A33EBBAD26311 (tag_id), PRIMARY KEY(company_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE offer_tag (offer_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', tag_id INT NOT NULL, INDEX IDX_2FBCD61B53C674EE (offer_id), INDEX IDX_2FBCD61BBAD26311 (tag_id), PRIMARY KEY(offer_id, tag_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tag (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, color VARCHAR(10) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE company_tag ADD CONSTRAINT FK_77A33EB979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company_tag ADD CONSTRAINT FK_77A33EBBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_tag ADD CONSTRAINT FK_2FBCD61B53C674EE FOREIGN KEY (offer_id) REFERENCES offer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE offer_tag ADD CONSTRAINT FK_2FBCD61BBAD26311 FOREIGN KEY (tag_id) REFERENCES tag (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE company ADD summary VARCHAR(255) DEFAULT NULL, ADD description LONGTEXT DEFAULT NULL, ADD latitude DOUBLE PRECISION DEFAULT NULL, ADD longitude DOUBLE PRECISION DEFAULT NULL, ADD additional_address VARCHAR(50) DEFAULT NULL');
        $this->addSql('ALTER TABLE student ADD additional_address VARCHAR(50) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company_tag DROP FOREIGN KEY FK_77A33EB979B1AD6');
        $this->addSql('ALTER TABLE company_tag DROP FOREIGN KEY FK_77A33EBBAD26311');
        $this->addSql('ALTER TABLE offer_tag DROP FOREIGN KEY FK_2FBCD61B53C674EE');
        $this->addSql('ALTER TABLE offer_tag DROP FOREIGN KEY FK_2FBCD61BBAD26311');
        $this->addSql('DROP TABLE company_tag');
        $this->addSql('DROP TABLE offer_tag');
        $this->addSql('DROP TABLE tag');
        $this->addSql('ALTER TABLE company DROP summary, DROP description, DROP latitude, DROP longitude, DROP additional_address');
        $this->addSql('ALTER TABLE student DROP additional_address');
    }
}
