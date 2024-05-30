<?php

namespace App\Enum;

enum WorkSectorEnum: string
{
    case DESIGN = 'design';
    case INFORMATIQUE = 'informatique';
    case FINANCE = 'finance';
    case SANTE = 'santé';
    case EDUCATION = 'éducation';
    case CONSTRUCTION = 'construction';
    case TRANSPORT = 'transport';
    case MARKETING = 'marketing';
    case JURIDIQUE = 'juridique';
    case ART = 'art';

    public function label(): string
    {
        return match ($this) {
            self::DESIGN => 'Design',
            self::INFORMATIQUE => 'Informatique',
            self::FINANCE => 'Finance',
            self::SANTE => 'Santé',
            self::EDUCATION => 'Éducation',
            self::CONSTRUCTION => 'Construction',
            self::TRANSPORT => 'Transport',
            self::MARKETING => 'Marketing',
            self::JURIDIQUE => 'Juridique',
            self::ART => 'Art',
        };
    }
}
