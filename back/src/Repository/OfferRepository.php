<?php

namespace App\Repository;

use App\Entity\Offer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Uid\Uuid;

class OfferRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Offer::class);
    }

    public function findByFilters(string $type = null, array $tagIds = [], array $durations = []): array
    {
        $tagIds = array_map(fn ($id) => Uuid::fromString($id)->toBinary(), $tagIds);

        $durationsFilter = array_map(function ($filter) {
            if (!empty($filter) && 2 === \count($filter)) {
                $filter = array_map(fn ($duration) => (int) $duration, $filter);

                return [
                    'min' => min($filter),
                    'max' => max($filter),
                ];
            }

            return null;
        }, $durations);

        $qb = $this->createQueryBuilder('c')
            ->leftJoin('c.tags', 't')
        ;

        if ($type) {
            $qb
                ->andWhere('c.type = :type')
                ->setParameter('type', $type)
            ;
        }

        if (!empty($tagIds)) {
            $qb
                ->andWhere('t.id IN (:tagIds)')
                ->setParameter('tagIds', $tagIds)
            ;
        }

        if (!empty($durationsFilter)) {
            $qb->andWhere('c.startDate IS NOT NULL')
                ->andWhere('c.endDate IS NOT NULL')
            ;

            $orCondition = $qb->expr()->orX();

            foreach ($durationsFilter as $filter) {
                if (!empty($filter)) {
                    $qb
                        ->andWhere('DATEDIFF(c.endDate, c.startDate) >= :minDuration')
                        ->andWhere('DATEDIFF(c.endDate, c.startDate) <= :maxDuration')
                        ->setParameter('minDuration', $filter['min'])
                        ->setParameter('maxDuration', $filter['max'])
                    ;
                }
            }

            if ($orCondition->count() > 0) {
                $qb->andWhere($orCondition);
            }
        }

        return $qb->getQuery()->execute();
    }
}
