import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../utils/breadcrumb.jsx';
import Badge from '../utils/badge.jsx';
import PrimaryTag from '../utils/primaryTag.jsx';
import PropTypes from "prop-types";

function OfferHeader({ offer, enableApplyButton = false }) {
  const navigate = useNavigate();

  const duration = Math.floor((new Date(offer.endDate) - new Date(offer.startDate)) / (1000 * 60 * 60 * 24));
  let durationString = `${duration} jours`;
  if (duration > 365) {
    durationString = `${Math.floor(duration / 365)} ans et ${Math.floor((duration % 365) / 30)} mois`;
  } else if (duration > 30) {
    durationString = `${Math.floor(duration / 30)} mois et ${duration % 30} jours`;
  }

  return (
    <div>
      {/* Header */}
      <div className="h-[300px] w-full bg-lightGrey px-32 flex flex-col pt-5 pb-10 gap-8">
        <Breadcrumb links={[
          { name: 'Accueil', href: '/' },
          { name: 'Offres', href: '/offres' },
          { name: offer.name, href: `/offre/${offer.id}` },
        ]} />
        {offer.company && (
          <div className="flex items-center justify-between bg-white p-6">
            <div className="flex items-center gap-4 xl:gap-8">
              <div className="flex items-center py-1 cursor-pointer" onClick={() => navigate(`/entreprise/${offer.company.slug}`)}>
                <img
                  src={`${import.meta.env.VITE_BACK_ENDPOINT}uploads/company/${offer.company.logo}`}
                  alt={offer.company.name}
                  className="max-w-20 max-h-20 object-contain"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-semibold">{offer.name}</h1>
                <div className="flex flex-col xl:flex-row xl:items-center xl:gap-2">
                  <p className="text-lg font-bold">{offer.company.name}</p>
                  <span className="hidden xl:block h-1 w-1 bg-grey"></span>
                  <p className="text-lg font-normal">{offer.company.city}</p>
                  {offer.startDate && offer.endDate && (
                    <div className="flex gap-2 text-lg">
                      <span className="hidden xl:block">-</span>
                      <p className="font-normal">Du {new Date(offer.startDate).toLocaleDateString()} au {new Date(offer.endDate).toLocaleDateString()}</p>
                      <p className="font-normal">({durationString})</p>
                      {offer.type === 'stage' && duration >= 44 && <span className="text-alertRed before:bg-alertRed before:inline-block before:w-2 before:h-2 before:relative before:rounded-full before:mr-2">Rémunéré</span>}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <PrimaryTag text={offer.type} />
                  <span className="w-[1px] bg-borderGrey"></span>
                  {offer.tags && offer.tags.map((tag) => (
                    <Badge key={tag.id} tag={tag} variant="offerTag" />
                  ))}
                </div>
              </div>
            </div>
            {enableApplyButton && (
              <div className="flex items-center gap-4">
                <img src="/share.svg" className="w-8 h-8" alt="Partager" />
                <span className="h-[50px] w-[1px] bg-borderGrey"></span>
                <button className="flex justify-center items-center px-14 py-3 w-48 h-[50px] leading-none text-white bg-primary" onClick={() => navigate(`/offre/${offer.id}/postuler`)}>Postuler</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

OfferHeader.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      logo: PropTypes.string,
      slug: PropTypes.string.isRequired
    }).isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.object).isRequired
  }),
  enableApplyButton: PropTypes.bool,
};

export default OfferHeader;
