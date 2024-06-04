<?php

namespace App\Enum;

enum LevelEnum: string
{
    case BAC_5 = 'Master, DEA, DESS';
    case BAC_3 = 'Licence';
    case BAC_2 = 'BTS, DUT, BUT';
    case BAC = 'Bac';
    case CAP = 'CAP, BEP';
}
