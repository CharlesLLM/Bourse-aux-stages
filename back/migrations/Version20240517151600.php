<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240517151600 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change (bool) promote to (enum) promote_status in offer table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE offer ADD promote_status VARCHAR(10) NOT NULL, DROP promote');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE offer ADD promote TINYINT(1) NOT NULL, DROP promote_status');
    }
}
