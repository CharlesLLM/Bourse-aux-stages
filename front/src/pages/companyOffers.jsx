import { React, useMemo, useState, useEffect } from "react";
import ListHero from "../components/listHero.jsx";
import OffersList from "../components/stageOffers/offersList.jsx";
import OffersFilters from "../components/stageOffers/offersFilters.jsx";
import '../../assets/styles/underline.scss';

function CompanyOffers() {
    //recup des données
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/data/data.json')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    //les filtres sélectionnés sont enregistrés dans cette variable
    const [selectedFilters, setSelectedFilters] = useState({
        InternshipOrApprenticeship: [],
        profile: [],
        levelSearched: [],
        daysSpan: [],
        distance: 50, // distance par def
    });
    //nombre d'offres affiché par page
    let PageSize = 7;
    //page affiché à l'écran
    const [currentPage, setCurrentPage] = useState(1);
    //ordre affichage
    const [sortOption, setSortOption] = useState("MOST_RECENT");

    //filtre l'affichage des offres
    const filteredData = useMemo(() => {
        return data.filter(offer => {
            // stage/alternance
            const isTypeMatch = selectedFilters.InternshipOrApprenticeship.length === 0 || selectedFilters.InternshipOrApprenticeship.includes(offer.offerType);
            // profile
            const isProfileMatch = selectedFilters.profile.length === 0 || offer.tags.some(tag => selectedFilters.profile.includes(tag));
            // niveau d'étude
            const isLevelMatch = selectedFilters.levelSearched.length === 0 || selectedFilters.levelSearched.includes(offer.levelSearched);
            // durée
            const isDurationMatch = selectedFilters.daysSpan.length === 0 || selectedFilters.daysSpan.some(duration => {
                switch (duration) {
                  case 'LESS_THAN_2':
                    return offer.daysSpan < 60;
                  case 'BETWEEN_2_AND_6':
                    return offer.daysSpan >= 60 && offer.daysSpan <= 180;
                  case 'BETWEEN_6_AND_12':
                    return offer.daysSpan > 180 && offer.daysSpan <= 360;
                  case 'MORE_THAN_12':
                    return offer.daysSpan > 360;
                  default:
                    return false;
                }
              });
            // distance
            const isDistanceMatch = offer.distance <= selectedFilters.distance;
      
            return isDistanceMatch && isProfileMatch && isTypeMatch && isLevelMatch && isDurationMatch;
          });
    }, [data, selectedFilters]);

    const nbOffers = filteredData.length;

    //change l'ordre d'affichage selon sortOption
    const sortedData = useMemo(() => {
        const sorted = [...filteredData];
        if (sortOption === "MOST_RECENT") {
            sorted.sort((a, b) => {
                const dateA = parseFrenchDate(a.publishedDate);
                const dateB = parseFrenchDate(b.publishedDate);
                return dateB - dateA;
            });
        } else {
            sorted.sort((a, b) => {
                const dateA = parseFrenchDate(a.publishedDate);
                const dateB = parseFrenchDate(b.publishedDate);
                return dateA - dateB;
            });
        }
        return sorted;
    }, [filteredData, sortOption]);
    
    //change l'ordre de la date pour les filtres et ordre d'affichage
    function parseFrenchDate(dateString) {
        const parts = dateString.split('/');
        return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    //retour page 1 quand l'ordre d'affichage ou le filtre change
    useEffect(() => {
        setCurrentPage(1);
    }, [sortOption, selectedFilters]);

    //page affiché à l'écran
    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return sortedData.slice(firstPageIndex, lastPageIndex);
    }, [sortedData, currentPage]);

    return (
      <div className="bg-[#F8F8FD] px-5 md:px-0">
        <ListHero
            mainText="Offres de stage"
            subtitle="Découvrez les entreprises qui proposent des offres de stage ou d'alternance"
            breadcrumb={[{ name: 'Accueil', href: '/' }, { name: 'Offres', href: '/offres' }, { name: 'Stages', href: '/offres' } ]}
        />
        <div className="flex flex-col md:flex-row md:px-32 pt-16 gap-16 bg-white">
            <div className="md:w-3/12">
                {/* filtres */}
                <OffersFilters setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters}/>
            </div>
            <div className="md:w-8/12">
                <div className="sm:flex sm:flex-row justify-between">
                    <div className="mb-6">
                        <h3 className="text-4xl text-black font-bold"> Résultats </h3>
                        <p> {nbOffers} offres trouvés </p>
                    </div>
                    <div>
                        <p>
                            <span className="text-[#25324B]"> Trier par: </span> 
                            <select className="bg-inherit"onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                                <option value="MOST_RECENT"> Date de publication (plus récent) </option>
                                <option value="LEAST_RECENT"> Date de publication (plus ancien) </option>
                            </select>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:px-12 md:mx-0">
                    {/* offres */}
                    <OffersList
                        data={currentData}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        PageSize={PageSize}
                        nbOffers={nbOffers}
                    />
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default CompanyOffers;
