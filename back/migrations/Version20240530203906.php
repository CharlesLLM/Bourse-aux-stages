<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240530203906 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add logo field to company';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company ADD logo VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE offer CHANGE promote_status promote_status VARCHAR(10) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company DROP logo');
        $this->addSql('ALTER TABLE offer CHANGE promote_status promote_status VARCHAR(10) NOT NULL');
    }
}
