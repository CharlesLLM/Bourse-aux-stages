<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240624203905 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add company creation date, revenue and distance';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company ADD creation_date DATETIME DEFAULT NULL, ADD revenue INT DEFAULT NULL, ADD distance INT DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company DROP creation_date, DROP revenue, DROP distance');
    }
}
