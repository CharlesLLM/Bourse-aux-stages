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

    public function countByType(): array
    {
        $counts = $this->createQueryBuilder('o')
            ->select('o.type, COUNT(o.id) as count')
            ->groupBy('o.type')
            ->getQuery()
            ->execute()
        ;
        $counts = array_map(fn ($count) => [$count['type']->value => (int) $count['count']], $counts);

        return array_merge(...$counts);
    }

    public function findByFilters(
        ?string $type = null,
        array $tagIds = [],
        array $levels = [],
        array $durations = [],
        ?int $distance = null
    ): array {
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

        $qb = $this->createQueryBuilder('o')
            ->leftJoin('o.tags', 't')
        ;

        if ($type) {
            $qb
                ->andWhere('o.type = :type')
                ->setParameter('type', $type)
            ;
        }

        if ($distance) {
            $qb
                ->andWhere('o.distance <= :distance')
                ->setParameter('distance', $distance)
            ;
        }

        if (!empty($tagIds)) {
            $qb
                ->andWhere('t.id IN (:tagIds)')
                ->setParameter('tagIds', $tagIds)
            ;
        }

        if (!empty($levels)) {
            $qb
                ->andWhere('o.requiredLevel IN (:levels)')
                ->setParameter('levels', $levels)
            ;
        }

        if (!empty($durationsFilter)) {
            $qb->andWhere('o.startDate IS NOT NULL')
                ->andWhere('o.endDate IS NOT NULL')
            ;

            $orCondition = $qb->expr()->orX();

            foreach ($durationsFilter as $filter) {
                if (!empty($filter)) {
                    $orCondition->add(
                        $qb->expr()->andX(
                            $qb->expr()->gte('DATE_DIFF(o.endDate, o.startDate)', ':minDuration'),
                            $qb->expr()->lte('DATE_DIFF(o.endDate, o.startDate)', ':maxDuration')
                        )
                    );

                    $qb->setParameter('minDuration', $filter['min']);
                    $qb->setParameter('maxDuration', $filter['max']);
                }
            }

            if ($orCondition->count() > 0) {
                $qb->andWhere($orCondition);
            }
        }

        return $qb->getQuery()->execute();
    }
}
