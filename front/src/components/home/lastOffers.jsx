import {useEffect, useState} from "react";
import LinkTo from "../utils/linkTo.jsx";
import {useNavigate} from "react-router-dom";

function LastOffers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  useEffect( () => {
    const latestOffers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}offer/latest`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOffers(data);
      } catch (err) {
        setError(err);
      }
    };
    latestOffers();
  }, []);

  if (offers && offers.length > 0) {
    return (
      <div className="space-y-5 md:space-y-10 w-full">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between items-start md:items-end">
          <h2 className="xl:text-5xl lg:text-4xl text-3xl">Dernières <span className="text-secondary">offres</span></h2>
          <LinkTo text={'Toutes les offres'} color={'secondary'} page={''} />
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-6">
          {offers?.map(offer => (
            <div key={offer.id} onClick={() => navigate("/")} className="group flex flex-col items-center xs:items-start px-4 xs:max-w-1/2 md:max-w-1/3 lg:max-w-1/4 py-5 border border-grey space-y-4 transition-all cursor-pointer">
              {/*<i className={`${category.icon}`}></i>*/}
              <div className={`flex flex-row justify-between w-full`}>
                <div className="w-12 h-12 rounded-full bg-third "></div>
                <p className={`text-sm text-primary bg-primary/[0.15] h-fit py-1 px-2`}>{offer.type}</p>
              </div>
              <p className="text-sm">{offer.name.length > 25 ? `${offer.name.substring(0, 25)}...` : offer.name}</p>
              <div className={`text-grey flex flex-row items-center justify-center xs:justify-start w-full space-x-2`}>
                <p className={`text-xs font-light overflow-hidden whitespace-nowrap`}>{offer.company.name.length > 20 ? `${offer.company.name.substring(0, 20)}...` : offer.company.name}</p>
                <span className={`h-2 w-2 bg-grey rounded-full`}></span>
                <p className={`text-xs font-light overflow-hidden whitespace-nowrap`}>{offer.company.city.length > 15 ? `${offer.company.city.substring(0, 15)}...` : offer.company.city}</p>
              </div>
              <p className={`text-sm text-grey font-light`}>{offer.description.length > 30 ? `${offer.description.substring(0, 40)}...` : offer.description}</p>
              <div className={`flex flex-row justify-center space-x-4`}>
                {offer.tags.slice(0, 2).map((tag) => (
                  <div key={`${offer.id}-${tag.id}`} className={`rounded-xl`} style={{backgroundColor: `${tag.color}1A`}}>
                    <p className={`text-center text-xs py-1 px-2  font-light`} style={{color: tag.color}}>{tag.name}</p>
                  </div>
                ))}
              </div>
            </div>
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
