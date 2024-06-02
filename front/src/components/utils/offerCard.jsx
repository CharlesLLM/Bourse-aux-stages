import Badge from './badge';

function OfferCard({ offer }) {
  return (
    <div className="p-6 border border-borderGrey bg-white w-72 min-h-56 space-y-4">
      <div>
        <h3 className="text-lg font-bold">{offer.name}</h3>
        <p className="text-textGrey font-normal">{new Date(offer.startDate).toLocaleDateString()} au {new Date(offer.endDate).toLocaleDateString()}</p>
      </div>
      <p className="text-textGrey font-normal line-clamp-2">{offer.description}</p>
      {offer.tags && (
        <div className="flex flex-wrap gap-2">
          {offer.tags.map((tag) => (
            <Badge key={`${offer.id}-${tag.id}`} variant="offerTag" tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
}

export default OfferCard;
