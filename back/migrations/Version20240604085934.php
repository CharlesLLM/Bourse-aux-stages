<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240604085934 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add end publication date to offer';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE offer ADD end_publication_date DATETIME NOT NULL, ADD required_level VARCHAR(20) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE offer DROP end_publication_date, DROP required_level');
    }
}
