import React from 'react'
import Landing from "../components/home/landing.jsx";
import TopCompanies from "../components/home/topCompanies.jsx";
import CompanyCTA from "../components/home/companyCTA.jsx";
import LastOffers from "../components/home/lastOffers.jsx";
import LastRequests from "../components/home/lastRequests.jsx";

function Home() {
  return (
    <Layout>
      <div>
        <p className="underline">hello</p>
        < Searchbar />
        < FeaturedCompany />
        <WorkSector />
      </div>
    </Layout>
  )
}

export default Home;
