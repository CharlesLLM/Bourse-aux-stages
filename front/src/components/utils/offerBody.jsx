import ProgressBar from "../utils/progressBar.jsx";
import Badge from "../utils/badge";
import Container from "../../layout/container.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from "react";

function OfferBody({ offer }) {
  const [similarOffers, setSimilarOffers] = useState([]);

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
              <p>Type d'offre</p>
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
              {offer.offerType === 'Stage' && offer.durations >= 44 && <span className="text-[#FF007A] before:bg-[#FF007A] before:inline-block before:w-2 before:h-2 before:relative before:rounded-full"> Rémunéré </span>}
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
          <div className="w-1/2">
            <img src={offer.company.logo} alt={offer.company.name} className="my-5"></img>
            <p className="font-normal my-5"> {offer.description} </p>
            <a className="text-primary flex gap-3 items-center" href={offer.company.linkedinlink}> En savoir plus sur {offer.company.name} <FaArrowRightLong /></a>
          </div>
          <div className="w-1/2">map</div>
        </Container>
      )}
      {similarOffers.length > 0 && (
        <Container>
          <h2 className="text-3xl font-semibold">Offres de stages similaires</h2>
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

export default OfferBody;
