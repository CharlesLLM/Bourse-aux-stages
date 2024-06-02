<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240527205411 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change country column length';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company CHANGE country country VARCHAR(100) NOT NULL');
        $this->addSql('ALTER TABLE student CHANGE country country VARCHAR(100) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE student CHANGE country country VARCHAR(30) NOT NULL');
        $this->addSql('ALTER TABLE company CHANGE country country VARCHAR(30) NOT NULL');
    }
}
