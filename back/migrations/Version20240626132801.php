<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240626132801 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add cv and letter to student, and other_file to application';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE application ADD other_file VARCHAR(500) DEFAULT NULL');
        $this->addSql('ALTER TABLE student ADD cv VARCHAR(500) DEFAULT NULL, ADD letter VARCHAR(500) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE student DROP cv, DROP letter');
        $this->addSql('ALTER TABLE application DROP other_file');
    }
}
