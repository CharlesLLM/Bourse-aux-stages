<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240607213729 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add company big logo';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company ADD big_logo VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company DROP big_logo');
    }
}
