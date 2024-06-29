<?php

namespace App\Enum;

enum LanguageLevelEnum: string
{
    case A1 = 'Notions';
    case A2 = 'Élémentaire';
    case B1 = 'Intermédiaire';
    case B2 = 'Intermédiaire avancé';
    case C1 = 'Avancé';
    case C2 = 'Maîtrise';
}
