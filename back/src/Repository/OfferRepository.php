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
        ?int $distance = null,
        array $companies = [],
        bool $displayActiveOffers = true,
        bool $displayClosedOffers = false
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
            ->where('o.startDate IS NOT NULL')
            ->andWhere('o.endDate IS NOT NULL')
        ;

        if (!$displayClosedOffers) {
            $qb->andWhere('o.active = true');
        }

        if (!$displayActiveOffers) {
            $qb->andWhere('o.active = false');
        }

        if ($type) {
            $qb->andWhere('o.type = :type')
                ->setParameter('type', $type);
        }

        if ($distance) {
            $qb->andWhere('o.distance <= :distance')
                ->setParameter('distance', $distance);
        }

        if (!empty($tagIds)) {
            $qb->andWhere('t.id IN (:tagIds)')
                ->setParameter('tagIds', $tagIds);
        }

        if (!empty($levels)) {
            $qb->andWhere('o.requiredLevel IN (:levels)')
                ->setParameter('levels', $levels);
        }

        if (!empty($companies)) {
            $qb->innerJoin('o.company', 'c')
                ->andWhere('c.slug IN (:companies)') 
                ->setParameter('companies', $companies);
        }

        if (!empty($durationsFilter)) {
            $qb->andWhere('o.startDate IS NOT NULL')
                ->andWhere('o.endDate IS NOT NULL');

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

    // Get the 8 offers that are the most similar to the given offer
    // Criterias: same type, same startDate (+/- 1 week), same duration (+/- 1 week), and at least one common tag
    public function findSimilar(Offer $offer): array
    {
        $duration = $offer->getEndDate()->diff($offer->getStartDate())->days;
        $offerId = Uuid::fromString($offer->getId())->toBinary();
        $tagIds = $offer->getTags()->map(fn ($tag) => Uuid::fromString($tag->getId())->toBinary())->toArray();

        $qb = $this->createQueryBuilder('o')
            ->leftJoin('o.tags', 't')
            ->where('o.id != :offerId')
            ->andWhere('o.type = :type')
            ->andWhere('o.startDate BETWEEN :startDateMin AND :startDateMax')
            ->andWhere('DATE_DIFF(o.endDate, o.startDate) BETWEEN :durationMin AND :durationMax')
            ->andWhere('o.endPublicationDate > :now')
            ->andWhere('o.distance <= :distance')
            ->andWhere('o.availablePlaces > 0')
            ->setParameter('offerId', $offerId)
            ->setParameter('type', $offer->getType())
            ->setParameter('startDateMin', (clone $offer->getStartDate())->modify('-7 day'))
            ->setParameter('startDateMax', (clone $offer->getStartDate())->modify('+7 day'))
            ->setParameter('durationMin', $duration - 7)
            ->setParameter('durationMax', $duration + 7)
            ->setParameter('now', new \DateTime())
            ->setParameter('distance', 100)
            ->setMaxResults(8)
        ;

        if (!empty($tagIds)) {
            $qb->andWhere('t.id IN (:tagIds)')
                ->setParameter('tagIds', $tagIds);
        }

        return $qb->getQuery()->execute();
    }
}
