import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import LinkTo from "../utils/linkTo.jsx";
import Badge from "../utils/badge.jsx";
import PrimaryTag from "../utils/primaryTag.jsx";

function LastOffers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const latestOffers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}offer/latest`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOffers(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    latestOffers();
  }, []);

  if (offers && offers.length > 0) {
    return (
      <div className="space-y-5 md:space-y-10 w-full px-32">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between items-start md:items-end">
          <h2 className="xl:text-5xl lg:text-4xl text-3xl">Dernières <span className="text-secondary">offres</span></h2>
          <LinkTo text={'Toutes les offres'} color={'secondary'} page={''} />
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {offers?.map(offer => (
            <Link key={offer.id} to={`/offre/${offer.id}`}  className="group flex flex-col items-center xs:items-start p-6 xs:max-w-1/2 md:max-w-1/3 lg:max-w-1/4 border border-grey gap-y-4 transition-all cursor-pointer">
              {/*<i className={`${category.icon}`}></i>*/}
              <div className={`flex flex-row justify-between w-full`}>
                <div className="w-16 h-16 rounded-full">
                  <img
                    src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${offer.company.logo}`} alt={offer.company.name}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <PrimaryTag text={offer.type} />
              </div>
              <p className="text-lg font-semibold line-clamp-2">{offer.name}</p>
              <div className={`text-grey flex flex-row items-center justify-center xs:justify-start w-full space-x-2`}>
                <p className="font-normal line-clamp-1">{offer.company.name}</p>
                <span className="h-1 w-1 bg-grey rounded-full"></span>
                <p className="font-normal line-clamp-1">{offer.company.city}</p>
              </div>
              <p className={`text-sm text-grey font-light`}>{offer.description.length > 30 ? `${offer.description.substring(0, 40)}...` : offer.description}</p>
              <div className={`flex flex-wrap gap-2`}>
                {offer.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag.id} tag={tag} variant="offerTag" />
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p className="text-primary text-2xl">Aucune offre disponible pour le moment.</p>
      </div>
    )
  }
}

export default LastOffers;
