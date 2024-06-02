import React from 'react'
import Searchbar from '../components/Searchbar.jsx';
import FeaturedCompany from "../components/home/featuredCompany.jsx";
import WorkSector from "../components/home/workSector.jsx";
import CompanyCTA from "../components/home/companyCTA.jsx";
import LastOffers from "../components/home/lastOffers.jsx";
import LastRequests from "../components/home/lastRequests.jsx";

function Home() {
  return (
    <div className="space-y-16 px-16 flex flex-col items-center">
      <Searchbar />
      <FeaturedCompany />
      <WorkSector />
      <CompanyCTA />
      <LastOffers />
      <LastRequests />
      <div></div>
    </div>
  )
}

export default Home;
