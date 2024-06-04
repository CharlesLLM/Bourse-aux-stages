import { useNavigate } from "react-router-dom";
import Badge from "../utils/badge";
import OfferTypeTag from "../utils/offerTypeTag";

const OfferCell = ({ offer }) => {
  const navigate = useNavigate();

  const offerDuration = Math.floor((new Date(offer.endDate) - new Date(offer.startDate)) / (1000 * 60 * 60 * 24));
  let offerDurationString = `${offerDuration} jours`;
  if (offerDuration > 365) {
    offerDurationString = `${Math.floor(offerDuration / 30)} mois et ${offerDuration % 30} jours`;
  }

  const publicationDuration = Math.floor((new Date (offer.endPublicationDate) - new Date (offer.createdAt)) / (1000 * 60 * 60 * 24));
  const remainingTime = Math.floor((new Date (offer.endPublicationDate) - new Date()) / (1000 * 60 * 60 * 24));
  const progressBarWidth = remainingTime / publicationDuration * 100;
  const progressBarColor = progressBarWidth > 40 ? '#56CDAD' : progressBarWidth > 10 ? '#FF9900' : '#FF007A';

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
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center flex-wrap ">
            <OfferTypeTag text={offer.type} />
            <span className={`h-6 w-[1px] bg-borderGrey`}></span>
            {offer.tags && offer.tags.map((tag) => (
              <Badge key={`${offer.id}-${tag.id}`} tag={tag} variant="offerTag" />
            ))}
            {offer.offerType === 'Stage' && offer.daysSpan >= 44 && <span className="text-[#FF007A] before:bg-[#FF007A] before:inline-block before:w-2 before:h-2 before:relative before:rounded-full"> Rémunéré </span>}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-44">
        <button 
          className="bg-primary py-3 px-6 text-white font-semibold w-full"
          onClick={() => navigate(`/offre/${offer.id}`)}
        >En savoir plus</button>
        <div className="w-full bg-borderGrey mt-4 mb-2">
            <div className="h-1.5" style={{ width: `${progressBarWidth}%`, backgroundColor: progressBarColor  }}></div>
        </div>
        <p className="text-xs font-normal">
          {remainingTime < 1 
            ? "Dernier jour pour postuler" 
            : remainingTime == 1 
              ? "Reste 1 jour pour postuler" 
              : `Reste ${remainingTime} jours pour postuler`
          }
        </p>
      </div>
    </div>
  );
};

export default OfferCell;
