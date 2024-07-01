import { Link } from 'react-router-dom';
import Badge from './badge';
import PropTypes from "prop-types";
import PrimaryTag from './primaryTag';
import DOMPurify from 'dompurify';

function OfferCard({ offer, displayOfferType = true, displayPicture = true }) {
  //rend le code html safe
  const sanitizedDescription = DOMPurify.sanitize(offer.description);

  return (
    <Link to={`/offre/${offer.id}`} className="p-6 border border-borderGrey bg-white w-72 min-h-56 space-y-4 cursor-pointer">
      {displayOfferType && (
        <div className="flex justify-between items-center">
          {displayPicture ?
            <img
              src={offer.company.logo ? `${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${offer.company.logo}` : "/placeholder.webp"}
              className="size-12 rounded-full object-contain"
              alt="companyLogo"
            />
            : <div></div>
          }
          <PrimaryTag text={offer.type} />
        </div>
      )}
      <div>
        <h3 className="text-lg font-bold">{offer.name}</h3>
        <p className="text-textGrey font-normal">{new Date(offer.startDate).toLocaleDateString()} au {new Date(offer.endDate).toLocaleDateString()}</p>
      </div>
      <div className="text-textGrey font-normal line-clamp-2" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
      {offer.tags && (
        <div className="flex flex-wrap gap-2">
          {offer.tags.map((tag) => (
            <Badge key={`${offer.id}-${tag.id}`} variant="offerTag" tag={tag} />
          ))}
        </div>
      )}
    </Link>
  );
}

OfferCard.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      logo: PropTypes.string,
    }),
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
  }).isRequired,
  displayOfferType: PropTypes.bool,
  displayPicture: PropTypes.bool,
};

export default OfferCard;
