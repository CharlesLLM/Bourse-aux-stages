<?php

namespace App\Enum;

enum OfferNameEnum: string
{
    case MARKETING_INTERNSHIP = 'Stage de marketing';
    case SOFTWARE_DEVELOPER = 'Développeur logiciel';
    case DATA_SCIENTIST = 'Scientifique des données';
    case GRAPHIC_DESIGNER = 'Designer graphique';
    case SALES_MANAGER = 'Responsable des ventes';
    case HR_INTERN = 'Stagiaire en ressources humaines';
    case ACCOUNTANT = 'Comptable';
    case PROJECT_MANAGER = 'Chef de projet';
    case CUSTOMER_SUPPORT = 'Support client';
    case CONTENT_WRITER = 'Rédacteur de contenu';
}
