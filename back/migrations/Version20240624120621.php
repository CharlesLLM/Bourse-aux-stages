<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240624120621 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add many to many skill/student and skill/offer relationships';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE skill_student (skill_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', INDEX IDX_ADD6311A5585C142 (skill_id), INDEX IDX_ADD6311ACB944F1A (student_id), PRIMARY KEY(skill_id, student_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE skill_offer (skill_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', offer_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\', INDEX IDX_CFE14025585C142 (skill_id), INDEX IDX_CFE140253C674EE (offer_id), PRIMARY KEY(skill_id, offer_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE skill_student ADD CONSTRAINT FK_ADD6311A5585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE skill_student ADD CONSTRAINT FK_ADD6311ACB944F1A FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE skill_offer ADD CONSTRAINT FK_CFE14025585C142 FOREIGN KEY (skill_id) REFERENCES skill (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE skill_offer ADD CONSTRAINT FK_CFE140253C674EE FOREIGN KEY (offer_id) REFERENCES offer (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE skill DROP FOREIGN KEY FK_5E3DE477CB944F1A');
        $this->addSql('DROP INDEX IDX_5E3DE477CB944F1A ON skill');
        $this->addSql('ALTER TABLE skill DROP student_id');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE skill_student DROP FOREIGN KEY FK_ADD6311A5585C142');
        $this->addSql('ALTER TABLE skill_student DROP FOREIGN KEY FK_ADD6311ACB944F1A');
        $this->addSql('ALTER TABLE skill_offer DROP FOREIGN KEY FK_CFE14025585C142');
        $this->addSql('ALTER TABLE skill_offer DROP FOREIGN KEY FK_CFE140253C674EE');
        $this->addSql('DROP TABLE skill_student');
        $this->addSql('DROP TABLE skill_offer');
        $this->addSql('ALTER TABLE skill ADD student_id BINARY(16) NOT NULL COMMENT \'(DC2Type:uuid)\'');
        $this->addSql('ALTER TABLE skill ADD CONSTRAINT FK_5E3DE477CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('CREATE INDEX IDX_5E3DE477CB944F1A ON skill (student_id)');
    }
}
