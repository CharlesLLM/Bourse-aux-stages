import { Link } from "react-router-dom";
import Badge from "../utils/badge";
import PrimaryTag from "../utils/primaryTag";
import PropTypes from "prop-types";
import ProgressBar from "../utils/progressBar";

const OfferCell = ({ offer }) => {
  const offerDuration = Math.floor((new Date(offer.endDate) - new Date(offer.startDate)) / (1000 * 60 * 60 * 24));
  let offerDurationString = `${offerDuration} jours`;
  if (offerDuration > 365) {
    offerDurationString = `${Math.floor(offerDuration / 30)} mois et ${offerDuration % 30} jours`;
  }

  return (
    <div className="flex justify-between gap-4 border border-borderGrey p-6 w-full">
      <div className="flex gap-6">
        <div className="w-[72px] h-[72px]">
          <img
            src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${offer.company.logo}`}
            alt={`${offer.company.name} logo`}
            className="object-contain"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{offer.name}</h3>
          <div className="flex flex-col xl:flex-row xl:items-center xl:gap-2">
            <p className="font-bold">{offer.company.name}</p>
            <span className="h-1 w-1 bg-darkGrey rounded-full"></span>
            <p className="font-normal">{offer.company.city}</p>
            {offer.startDate && offer.endDate && (
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 bg-darkGrey rounded-full"></span>
                <p className="font-normal">Du {new Date(offer.startDate).toLocaleDateString()} au {new Date(offer.endDate).toLocaleDateString()} ({offerDurationString})</p>
                {offer.type === 'stage' && offerDuration >= 44 && <span className="text-alertRed before:bg-alertRed before:inline-block before:w-2 before:h-2 before:relative before:rounded-full before:mr-2">Rémunéré</span>}
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center flex-wrap ">
            <PrimaryTag text={offer.type} />
            <span className={`h-6 w-[1px] bg-borderGrey`}></span>
            {offer.tags && offer.tags.map((tag) => (
              <Badge key={`${offer.id}-${tag.id}`} tag={tag} variant="offerTag" />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-44">
        <Link 
          to={`/offre/${offer.id}`}
          className="bg-primary py-3 px-6 text-white font-semibold w-full"
        >En savoir plus</Link>
        <ProgressBar offer={offer} />
      </div>
    </div>
  );
};

OfferCell.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      logo: PropTypes.string
    }).isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    endPublicationDate: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })).isRequired,
  })
};

export default OfferCell;
