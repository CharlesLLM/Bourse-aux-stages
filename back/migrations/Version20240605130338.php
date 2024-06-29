<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240605130338 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add pic to user, remove email from admin, make size and category_id nullable in company, change name length in language';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user ADD pic VARCHAR(500) DEFAULT NULL');
        $this->addSql('ALTER TABLE admin DROP email');
        $this->addSql('ALTER TABLE company CHANGE size size INT DEFAULT NULL, CHANGE category_id category_id BINARY(16) DEFAULT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE language CHANGE name name VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user DROP pic');
        $this->addSql('ALTER TABLE admin ADD email VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE company CHANGE size size INT NOT NULL, CHANGE category_id category_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE language CHANGE name name VARCHAR(30) NOT NULL');
    }
}
