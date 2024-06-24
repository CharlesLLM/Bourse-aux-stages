import { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ListHero from "../components/listHero.jsx";
import Pagination from "../components/utils/pagination.jsx";
import OfferCell from "../components/stageOffers/offerCell.jsx";
import OffersFilters from "../components/stageOffers/offersFilters.jsx";
import '../../assets/styles/underline.scss';

function CompanyOffers() {
    const { type } = useParams();
    const [offers, setOffers] = useState([]);
    const [tags, setTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState("MOST_RECENT");
    const [selectedFilters, setSelectedFilters] = useState({
        profiles: [],
        levels: [],
        durations: [],
        distance: "",
    });

    let pageSize = 7;

    useEffect(() => {
        const getOffers = async () => {
            let url = `${import.meta.env.VITE_BACK_ENDPOINT}offers`;
            url += `?type=${type}`;
            url += `&tags=${selectedFilters.profiles}`;
            url += `&levels=${selectedFilters.levels}`;
            url += `&durations=[${selectedFilters.durations}]`;
            url += `&distance=${selectedFilters.distance ? selectedFilters.distance : 0}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setOffers(data);

                if (selectedFilters.profiles.length === 0 && selectedFilters.levels.length === 0 && selectedFilters.durations.length === 0) {
                    const tags = data.map((company) => company.tags).flat();
                    const uniqueTags = tags.filter((tag, index, self) => self.findIndex(t => t.id === tag.id) === index);
                    setTags(uniqueTags);
                }
          } catch (err) {
            console.error('Error fetching data: ', err);
          }
        };
    
        getOffers();
    }, [type, selectedFilters]);

    const sortedData = useMemo(() => {
        const sorted = [...offers];
        if (sortOption === "MOST_RECENT") {
            sorted.sort((a, b) => {
                const dateA = a.createdAt;
                const dateB = b.createdAt;
                return dateB - dateA;
            });
        } else {
            sorted.sort((a, b) => {
                const dateA = a.createdAt;
                const dateB = b.createdAt;
                return dateA - dateB;
            });
        }
        return sorted;
    }, [offers, sortOption]);

    useEffect(() => {
        setCurrentPage(1);
    }, [sortOption, selectedFilters]);

    //page affiché à l'écran
    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return sortedData.slice(firstPageIndex, lastPageIndex);
    }, [sortedData, currentPage, pageSize]);

    return (
      <div className="bg-lightGrey px-5 md:px-0">
        {type && type === "stage" ? (
            <ListHero
                mainText={`Offres de stage`}
                subtitle={`Découvrez les offres de stage actuellement proposées par les entreprises`}
                breadcrumb={[
                    { name: 'Accueil', href: '/' },
                    { name: 'Offres', href: '/offres/stage' },
                    { name: 'Stages', href: '/offres/stage' }
                ]}
            />
        ) : (
            <ListHero
                mainText={`Offres d'alternance`}
                subtitle={`Découvrez les offres d'alternance actuellement proposées par les entreprises`}
                breadcrumb={[
                    { name: 'Accueil', href: '/' },
                    { name: 'Offres', href: '/offres/alternance' },
                    { name: 'Alternances', href: '/offres/alternance' }
                ]}
            />
        )}
        <div className="flex flex-col md:flex-row md:px-32 py-16 gap-16 bg-white">
            <div className="md:w-64">
                <OffersFilters
                    setSelectedFilters={setSelectedFilters}
                    selectedFilters={selectedFilters}
                    tags={tags}
                />
            </div>
            <div className="w-full">
                <div className="sm:flex sm:flex-row justify-between">
                    <div className="mb-6">
                        <h3 className="text-4xl text-black font-bold"> Résultats </h3>
                        <p>{offers.length} offres trouvés </p>
                    </div>
                    <div>
                        <p>
                            <span className="text-darkGrey"> Trier par: </span> 
                            <select className="bg-inherit"onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
                                <option value="MOST_RECENT"> Date de publication (plus récent) </option>
                                <option value="LEAST_RECENT"> Date de publication (plus ancien) </option>
                            </select>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:mx-0">
                    {/* offres */}
                    <div>
                        <div className="flex flex-col gap-4 md:mx-0">
                            {currentData.map((offer) => (
                                <OfferCell key={offer.id} offer={offer} />
                            ))}
                        </div>
                        <div>
                            <Pagination
                                className="pagination-bar"
                                currentPage={currentPage}
                                totalCount={offers.length}
                                pageSize={pageSize}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }

  export default CompanyOffers;
