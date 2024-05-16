import React from 'react'
import Layout from "../layout/layout.jsx";
import Searchbar from '../components/Searchbar.jsx';
import FeaturedCompany from "../components/home/featuredCompany.jsx";
import WorkSector from "../components/home/workSector.jsx";
import CompagnyCTA from "../components/home/compagnyCTA.jsx";
import LastOffers from "../components/home/lastOffers.jsx";

function Home() {
  return (
    <Layout>
      <div className="space-y-16 px-16 flex flex-col items-center">
        < Searchbar />
        < FeaturedCompany />
        <WorkSector />
        <CompagnyCTA />
        <LastOffers />
        <div></div>
      </div>
    </Layout>
  )
}

export default Home;

