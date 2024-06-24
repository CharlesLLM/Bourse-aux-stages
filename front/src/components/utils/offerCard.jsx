import { useNavigate } from 'react-router-dom';
import Badge from './badge';
import PropTypes from "prop-types";

function OfferCard({ offer }) {
  const navigate = useNavigate();

  return (
    <div className="p-6 border border-borderGrey bg-white w-72 min-h-56 space-y-4 cursor-pointer" onClick={() => navigate(`/offre/${offer.id}`)}>
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

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default OfferCard;
