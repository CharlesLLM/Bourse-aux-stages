import { useMemo, useState, useEffect } from "react";
import Pagination from "../components/utils/pagination.jsx";
import OfferCellAdmin from "../components/companyOffersAdmin/offerCellAdmin.jsx";
import OfferCellHeaderAdmin from "../components/companyOffersAdmin/offerCellHeaderAdmin.jsx";
import '../../assets/styles/underline.scss';

function CompanyOffersAdmin() {
    const company = "coinbase";
    const [offers, setOffers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOption, setFilterOption] = useState("ALL");
    const [pageSize, setPageSize] = useState(7);
    const [nbOffers, setNbOffers] = useState(0);

    useEffect(() => {
        const getOffers = async () => {
            let url = `${import.meta.env.VITE_BACK_ENDPOINT}offers`;
            url += `?companies=${company}`;
            switch(filterOption){
                case "ALL":
                    url += "&closedOffers";
                    break;
                case "CLOSED":
                    url += "&closedOffers&noActiveOffers";
                    break;
                default:
                    break;
            }
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setOffers(data);
                setNbOffers(data.length);
          } catch (err) {
            console.error('Error fetching data: ', err);
          }
        };
    
        getOffers();
    }, [company, filterOption]);

    //page affiché à l'écran
    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return offers.slice(firstPageIndex, lastPageIndex);
    }, [offers, currentPage, pageSize]);

    return (
        <div className="bg-white md:px-32 py-16">
            <div className="w-full">
                <div className="sm:flex sm:flex-row justify-between p-4 border border-borderGrey items-center">
                    <h3 className="text-2xl text-black font-bold"> {nbOffers} offres trouvées </h3>
                    <div>
                        <span className="text-darkGrey"> Filtrer par statut: </span> 
                        <select className="bg-inherit"onChange={(e) => setFilterOption(e.target.value)} value={filterOption}>
                            <option value="ALL"> tous </option>
                            <option value="ACTIVE"> active </option>
                            <option value="CLOSED"> clôturé </option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col md:mx-0">
                    {/* offres */}
                    <div>
                        <table className="table-fixed w-full text-sm text-left text-textGrey border border-borderGrey">
                            <OfferCellHeaderAdmin />
                            <tbody>
                                {currentData.map((offer) => (
                                    <OfferCellAdmin key={offer.id} offer={offer} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-row flex-nowrap justify-between border border-borderGrey max-h-28 px-10 py-6">
                        <div className="text-[#7C8493]">
                            Voir 
                            <select className="bg-inherit mx-2 border border-[#D6DDEB] p-4 rounded-sm"onChange={(e) => setPageSize(parseInt(e.target.value))} value={pageSize}>
                                <option value="7"> 7 </option>
                                <option value="10"> 10 </option>
                                <option value="20"> 20 </option>
                                <option value="30"> 30 </option>
                            </select>
                                offres par page
                        </div>
                        <Pagination
                            className="pagination-bar h-16"
                            currentPage={currentPage}
                            totalCount={offers.length}
                            pageSize={pageSize}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
  }

  export default CompanyOffersAdmin;
