<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240627075800 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add linkedin_link, personal_website, driving_licence, disability to student';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE student ADD linkedin_link VARCHAR(255) DEFAULT NULL, ADD personal_website VARCHAR(255) DEFAULT NULL, ADD driving_licence TINYINT(1) DEFAULT NULL, ADD disability TINYINT(1) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE student DROP linkedin_link, DROP personal_website, DROP driving_licence, DROP disability');
    }
}
