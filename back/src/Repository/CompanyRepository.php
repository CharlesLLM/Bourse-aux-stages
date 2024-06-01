<?php

namespace App\Repository;

use App\Entity\Company;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Uuid;

class CompanyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Company::class);
    }

    public function findByFilters(array $tagIds = [], array $categoryIds = []): array
    {
        $tagIds = array_map(fn ($id) => Uuid::fromString($id)->toBinary(), $tagIds);
        $categoryIds = array_map(fn ($id) => Uuid::fromString($id)->toBinary(), $categoryIds);

        $qb = $this->createQueryBuilder('c')
            ->leftJoin('c.tags', 't')
            ->leftJoin('c.category', 'cc')
        ;

        if (!empty($tagIds)) {
            $qb
                ->andWhere('t.id IN (:tagIds)')
                ->setParameter('tagIds', $tagIds)
            ;
        }

        if (!empty($categoryIds)) {
            $qb
                ->andWhere('cc.id IN (:categoryIds)')
                ->setParameter('categoryIds', $categoryIds)
            ;
        }

        return $qb->getQuery()->execute();
    }
}
