import ProgressBar from "../utils/progressBar.jsx";
import Badge from "../utils/badge";
import Container from "../../layout/container.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import OfferCard from "../utils/offerCard";
import PrimaryTag from "./primaryTag.jsx";
import DOMPurify from 'dompurify';

function OfferBody({ offer, alreadySubmitted = false }) {
  const [similarOffers, setSimilarOffers] = useState([]);
  //rend le code html safe
  const sanitizedDescription = DOMPurify.sanitize(offer.description);

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
            <div
                className="font-normal"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </div>
          {(!alreadySubmitted)
            ?
              <Link
                to={localStorage.getItem('token') ? `/offre/${offer.id}/postuler` : {pathname: '/connexion'}}
                state={localStorage.getItem('token') ? '' : {redirect: `/offre/${offer.id}`}}
                className="px-14 py-3 w-48 h-[50px] leading-none text-white bg-primary flex items-center"
              >
                {!localStorage.getItem('token') ? 'Se connecter' : 'Postuler'}
              </Link>
            :
              <p></p>
          }
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
              <p className="text-primary font-semibold">{offer.applicationsCount}</p>
            </div>
          </div>

          <hr className="h-px bg-borderGrey" />

          <div className="space-y-6">
            <h2 className="text-primary text-2xl font-semibold"> Profils métiers</h2>
            <div className="flex gap-2 items-center flex-wrap">
              {offer.tags && offer.tags.map((tag) => (
                <Badge key={`${offer.id}-${tag.id}`} tag={tag} variant="offerTag" />
              ))}
            </div>
          </div>

          <hr className="h-px bg-borderGrey" />

          {offer.skills && (
            <div className="space-y-6">
              <h2 className="text-primary text-2xl font-semibold">Compétences recherchées</h2>
              <ul className="flex flex-wrap gap-2.5">
                {offer.skills.map((skill) => (
                  <PrimaryTag key={skill.id} text={skill.name} />
                ))}
              </ul>
            </div>
          )}
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
          <div className="w-1/2 h-[420px] flex gap-4">
            {offer.company.images && offer.company.images.length > 0 && (
              <div className="flex flex-col justify-between gap-4 w-40 h-full">
                <img
                  src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${offer.company.images[0]}`}
                  alt={offer.company.name}
                  className="max-w-40 max-h-32"
                />
                <img
                  src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${offer.company.images[1]}`}
                  alt={offer.company.name}
                  className="max-w-40 max-h-32"
                />
                <img
                  src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${offer.company.images[2]}`}
                  alt={offer.company.name}
                  className="max-w-40 max-h-32"
                />
              </div>
            )}
            <div className="w-full h-full bg-lightGrey flex justify-center items-center">
              MAP
            </div>
          </div>
        </Container>
      )}

      {similarOffers.length > 0 && (
        <div className="bg-lightGrey flex flex-col md:px-32 md:py-[72px] gap-16 w-full"
          style={{clipPath: "polygon(7.5% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 13%)"}}
        >
          <div className="flex justify-between">
            <h2 className="text-3xl font-semibold">Offres {offer.type === 'stage' ? "de stage" : "d'alternance"} similaires</h2>
            <Link to={`/offres/${offer.type}`} className="text-primary font-semibold w-fit flex gap-4 items-center cursor-pointer">
              Toutes les offres
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-primary size-4">
                <path d="M12.1716 6.9999L6.8076 1.63589L8.2218 0.22168L16 7.9999L8.2218 15.778L6.8076 14.3638L12.1716 8.9999H0V6.9999H12.1716Z"/>
              </svg>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {similarOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
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
      images: PropTypes.arrayOf(PropTypes.string),
    }),
    tags: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
    skills: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })),
    applicationsCount: PropTypes.number.isRequired,
  }).isRequired,
  alreadySubmitted: PropTypes.bool,
};

export default OfferBody;
