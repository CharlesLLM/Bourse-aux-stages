import ProgressBar from '../utils/progressBar.jsx';
import Badge from "../utils/badge";
import Container from "../../layout/container.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState } from 'react';

function OfferBody({ offer, enableApplyButton = false }) {

    const [similarOffers, setSimilarOffers] = useState([]);

  return (
    <div>
        <Container>
            <div className="flex flex-col w-8/12">
                <div>
                    <h2 className="text-3xl my-5"> A propos de ce stage</h2>
                    <p className="font-normal">
                        {offer.description}
                    </p>
                </div>
                <div>
                    <h2 className="text-3xl my-5"> Missions</h2>
                    <p className="font-normal">
                        {offer.description}
                    </p>
                </div>
                <div>
                    <h2 className="text-3xl my-5"> Profil Recherché</h2>
                    <p className="font-normal">
                        {offer.description}
                    </p>
                </div>
                <div className="my-6">
                    {enableApplyButton && (
                        <button className="px-14 py-3 w-48 h-[50px] leading-none text-white bg-primary" onClick={() => navigate(`/offre/${offer.id}/postuler`)}>Postuler</button>
                    )}
                </div>
            </div>
            <div className="w-3/12 font-normal flex flex-col gap-10 pt-5">
                <h2 className="text-primary text-2xl">Échéances</h2>
                <div className="w-full bg-lightGrey p-4">
                    <ProgressBar startDate={offer.startDate} endDate={offer.endDate} createdAt={offer.createdAt} endPublicationDate={offer.endPublicationDate} displayLabelTop={true}/> 
                </div>
                <div className="flex justify-between flex-row">
                    <p>Postuler avant le</p>
                    <p className="text-primary font-semibold"> {offer.endDate} </p>
                </div>
                <div className="flex justify-between flex-row">
                    <p>Publié  le</p>
                    <p className="text-primary font-semibold"> {offer.createdAt} </p>
                </div>
                <div className="flex justify-between flex-row">
                    <p>Type d'offre </p>
                    <p className="text-primary font-semibold"> {offer.type} </p>
                </div>
                <div className="flex justify-between flex-row">
                    <p>Gratification </p>
                    <p className="text-primary font-semibold"> { offer.revenue + "€" || "Pas de gratification" } </p>
                </div>
                <div className="flex justify-between flex-row">
                    <p>Candidature déposées</p>
                    <p className="text-primary font-semibold"> - </p>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-t-2 dark:bg-gray-700 border-top"></hr>
                <div>
                    <h2 className="text-primary text-2xl"> Profils métiers</h2>
                    <div className="flex gap-2 items-center flex-wrap pt-5">
                        {offer.tags && offer.tags.map((tag) => (
                        <Badge key={`${offer.id}-${tag.id}`} tag={tag} variant="offerTag" />
                        ))}
                        {offer.offerType === 'Stage' && offer.durations >= 44 && <span className="text-[#FF007A] before:bg-[#FF007A] before:inline-block before:w-2 before:h-2 before:relative before:rounded-full"> Rémunéré </span>}
                    </div>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-t-2 dark:bg-gray-700 border-top"></hr>
                <div>
                    <h2 className="text-primary text-2xl"> Compétences recherchés </h2>
                    <div>
                        -
                    </div>
                </div>
            </div>
        </Container>
        <hr className="h-px my-8 bg-gray-200 border-t-2 dark:bg-gray-700 border-top mx-32"></hr>
        { offer.company && (
            <Container>
                <div className="w-8/12">
                    <img src={offer.company.logo} alt={offer.company.name} className="my-5"></img>
                    <p className="font-normal my-5"> {offer.description} </p>
                    <a className="text-primary flex flex-row gap-3 items-center" href={offer.company.linkedinlink}> En savoir plus sur {offer.company.name} <FaArrowRightLong /></a>
                </div>
                <div className="w-3/12">
                    map
                </div>
            </Container>
        )}
        { similarOffers.length > 0 && (
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
