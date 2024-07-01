<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240630121030 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add mission, required_profile and active columns to offer table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE offer ADD mission LONGTEXT NOT NULL, ADD required_profile LONGTEXT NOT NULL, ADD active TINYINT(1) DEFAULT 1 NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE offer DROP mission, DROP required_profile, DROP active');
    }
}
