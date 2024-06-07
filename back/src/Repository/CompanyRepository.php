<?php

namespace App\Repository;

use App\Entity\Company;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Uuid;

class CompanyRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Company::class);
    }

    public function findCompaniesWithMostOffers(): array
    {
        $qb = $this->queryEnabled();
        $qb->leftJoin('c.offers', 'o')
            ->orderBy('COUNT(o)', 'DESC')
            ->groupBy('c')
            ->setMaxResults(5)
        ;

        return $qb->getQuery()->execute();
    }

    public function findByFilters(array $tagIds = [], array $categoryIds = [], array $sizes = []): array
    {
        $tagIds = array_map(fn ($id) => Uuid::fromString($id)->toBinary(), $tagIds);
        $categoryIds = array_map(fn ($id) => Uuid::fromString($id)->toBinary(), $categoryIds);

        $sizesFilter = array_map(function ($filter) {
            if (!empty($filter) && 2 === \count($filter)) {
                $filter = array_map(fn ($size) => (int) $size, $filter);

                return [
                    'min' => min($filter),
                    'max' => max($filter),
                ];
            }

            return null;
        }, $sizes);

        $qb = $this->queryEnabled();
        $qb->leftJoin('c.tags', 't')
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

        if (!empty($sizesFilter)) {
            $qb->andWhere('c.size IS NOT NULL');
            $orCondition = $qb->expr()->orX();

            foreach ($sizesFilter as $filter) {
                if (!empty($filter)) {
                    $conditionSuffix = $filter['min'].'_'.$filter['max'];

                    $orCondition->add(
                        $qb->expr()->andX(
                            $qb->expr()->gte('c.size', ':min_'.$conditionSuffix),
                            $qb->expr()->lte('c.size', ':max_'.$conditionSuffix)
                        )
                    );

                    $qb->setParameter(':min_'.$conditionSuffix, $filter['min']);
                    $qb->setParameter(':max_'.$conditionSuffix, $filter['max']);
                }
            }

            if ($orCondition->count() > 0) {
                $qb->andWhere($orCondition);
            }
        }

        return $qb->getQuery()->execute();
    }

    public function queryEnabled(): QueryBuilder
    {
        return $this->createQueryBuilder('c')
            ->where('c.enabled = :enabled')
            ->setParameter('enabled', true)
        ;
    }
}
