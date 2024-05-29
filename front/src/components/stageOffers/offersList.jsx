import { React, useMemo, useState } from "react";
import Pagination from "../utils/pagination.jsx";
import Offer from "./offerCell.jsx";
import Filters from "./offersFilters.jsx";
import '../utils/underline.css'

function OffersList() {

    const data = [
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks1",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "3",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks2",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "10",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks3",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "20",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks4",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "25",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks5",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "1",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks6",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "0",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks7",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "30",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks8",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "32",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks9",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "3",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks10",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "3",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
        {
            logo: "mentalworks.png",
            offerName: "Assistant Social Media",
            companyName: "Mentalworks11",
            location: "Lacroix St ouen",
            startDate: "20/05/2024",
            endDate: "28/08/2024",
            daysSpan: "30",
            remainingDays: "3",
            tags: [
                "Stage", "Marketing", "Design"
            ]
        },
    ]
    const nbOffers = data.length;
    //nombre d'offres affiché par page
    let PageSize = 8;
    //page affiché à l'écran
    const [currentPage, setCurrentPage] = useState(1);
    const currentData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);
  
    return (
      <div className="bg-[#F8F8FD] pt-10">
        <div className="text-center">
            <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl"> Offres de <span className="text-secondary custom-underline">stage</span></h1>
            <p className="text-[#25324B] mt-14">Découvrez les offres de stages actuellement proposées par les entreprises</p>
        </div>
        <div className="flex flex-row md:px-32 mt-16 pt-16 gap-16 bg-white">
            <div className="w-3/12">
                {/* filtres */}
                <Filters/>
            </div>
            <div className="w-8/12">
                <div className="sm:flex sm:flex-row justify-between">
                    <div className="mb-6">
                        <h3 className="text-4xl text-black font-bold"> Résultats </h3>
                        <p> {nbOffers} offres trouvés </p>
                    </div>
                    <div>
                        <p>
                            <span className="text-[#25324B]"> Trier par: </span> 
                            <select>
                                <option value="MOST_RECENT"> Date de publication (plus récent) </option>
                                <option value="LEAST_RECENT"> Date de publication (plus ancien) </option>
                            </select>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    {/* offres */}
                    {currentData.map((offer, index) => (
                        <Offer
                            key={index}
                            logo={offer.logo}
                            offerName={offer.offerName}
                            companyName={offer.companyName}
                            location={offer.location}
                            startDate={offer.startDate}
                            endDate={offer.endDate}
                            daysSpan={offer.daysSpan}
                            remainingDays={offer.remainingDays}
                            tags={offer.tags}
                        />
                    ))}
                </div>
                <div>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={nbOffers}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default OffersList;