import ProgressBar from "../utils/progressBar.jsx";
import Badge from "../utils/badge";
import Container from "../../layout/container.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import OfferCard from "../utils/offerCard";

function OfferBody({ offer }) {
  const navigate = useNavigate();
  const [similarOffers, setSimilarOffers] = useState([]);

  useEffect(() => {
    const getSimilarOffers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}offer/${offer.id}/similar`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSimilarOffers(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getSimilarOffers();
  }, [offer.id]);

  return (
    <div>
      <Container>
        {/* Left content */}
        <div className="w-2/3 flex flex-col gap-10">
          <div>
            <h2 className="text-3xl my-5">À propos de ce stage</h2>
            <p className="font-normal">{offer.description}</p>
          </div>
          <button className="px-14 py-3 w-48 h-[50px] leading-none text-white bg-primary" onClick={() => navigate(`/offre/${offer.id}/postuler`)}>Postuler</button>
        </div>

        {/* Right content */}
        <div className="w-1/3 font-normal flex flex-col gap-10">
          <div className="space-y-6">
            <h2 className="text-primary text-2xl font-semibold">Échéances</h2>
            <ProgressBar offer={offer} viewStyle={true} />
            <div className="flex justify-between">
              <p>Postuler avant le</p>
              <p className="text-primary font-semibold">{new Date(offer.endDate).toLocaleDateString('fr-FR', {day: "numeric", month: "long", year: "numeric"})}</p>
            </div>
            <div className="flex justify-between">
              <p>Offre publiée le</p>
              <p className="text-primary font-semibold">{new Date(offer.createdAt).toLocaleDateString('fr-FR', {day: "numeric", month: "long", year: "numeric"})}</p>
            </div>
            <div className="flex justify-between">
              <p>Type d&apos;offre</p>
              <p className="text-primary font-semibold capitalize">{offer.type}</p>
            </div>
            <div className="flex justify-between">
              <p>Gratification </p>
              <p className="text-primary font-semibold">{offer.revenue + "€" || "Pas de gratification"}</p>
            </div>
            <div className="flex justify-between">
              <p>Candidatures déposées</p>
              <p className="text-primary font-semibold">
                {/* TODO : Set actual value */}
              </p>
            </div>
          </div>

          <hr className="h-px bg-borderGrey" />

          <div className="space-y-6">
            <h2 className="text-primary text-2xl font-semibold"> Profils métiers</h2>
            <div className="flex gap-2 items-center flex-wrap">
              {offer.tags && offer.tags.map((tag) => (
                <Badge key={`${offer.id}-${tag.id}`} tag={tag} variant="offerTag" />
              ))}
              {offer.type === 'Stage' && offer.durations >= 44 && <span className="text-[#FF007A] before:bg-[#FF007A] before:inline-block before:w-2 before:h-2 before:relative before:rounded-full"> Rémunéré </span>}
            </div>
          </div>

          <hr className="h-px bg-borderGrey" />

          <div>
            <h2 className="text-primary text-2xl font-semibold">Compétences recherchées</h2>
            <div> - </div>
          </div>
        </div>
      </Container>

      <hr className="h-px bg-borderGrey mx-32" />
      {offer.company && (
        <Container>
          <div className="w-1/2 space-y-8">
            {(offer.company.bigLogo || offer.company.logo) && (
              <img
                src={`${import.meta.env.VITE_BACK_ENDPOINT}uploads/company/${offer.company.bigLogo || offer.company.logo}`}
                alt={offer.company.name}
                className="object-cover max-w-full max-h-16"
              />
            )}
            <p className="text-textGrey font-bold">{offer.company.summary}</p>
            <p className="font-normal line-clamp-[7]">{offer.company.description}</p>
            {offer.company.linkedinlink && (
              <a className="text-primary flex gap-3 items-center cursor-pointer" href={offer.company.linkedinlink}> En savoir plus sur {offer.company.name} <FaArrowRightLong /></a>
            )}
          </div>
          <div className="w-1/2">
            {/* TODO : map */}
          </div>
        </Container>
      )}

      {similarOffers.length > 0 && (
        <Container className="bg-lightGrey flex-col" >
          <div className="flex justify-between">
            <h2 className="text-3xl font-semibold">Offres {offer.type === 'stage' ? "de stage" : "d'alternance"} similaires</h2>
            <div onClick={() => navigate(`/offres/${offer.type}`)} className="text-primary font-semibold w-fit flex gap-4 items-center cursor-pointer">
              Toutes les offres
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-primary size-4">
                <path d="M12.1716 6.9999L6.8076 1.63589L8.2218 0.22168L16 7.9999L8.2218 15.778L6.8076 14.3638L12.1716 8.9999H0V6.9999H12.1716Z"/>
              </svg>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {similarOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </Container>
      )}
    </div>
  )
}

OfferBody.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    revenue: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      summary: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      logo: PropTypes.string,
      bigLogo: PropTypes.string,
      linkedinlink: PropTypes.string,
    }),
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
  }).isRequired,
};

export default OfferBody;
