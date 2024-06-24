<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240607213729 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add company big logo and change foreign key constraint from company_id to offer_id in application table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company ADD big_logo VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE application DROP FOREIGN KEY FK_A45BDDC1979B1AD6');
        $this->addSql('DROP INDEX IDX_A45BDDC1979B1AD6 ON application');
        $this->addSql('ALTER TABLE application CHANGE company_id offer_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE application ADD CONSTRAINT FK_A45BDDC153C674EE FOREIGN KEY (offer_id) REFERENCES offer (id)');
        $this->addSql('CREATE INDEX IDX_A45BDDC153C674EE ON application (offer_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company DROP big_logo');
        $this->addSql('ALTER TABLE application DROP FOREIGN KEY FK_A45BDDC153C674EE');
        $this->addSql('DROP INDEX IDX_A45BDDC153C674EE ON application');
        $this->addSql('ALTER TABLE application CHANGE offer_id company_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE application ADD CONSTRAINT FK_A45BDDC1979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('CREATE INDEX IDX_A45BDDC1979B1AD6 ON application (company_id)');
    }
}
