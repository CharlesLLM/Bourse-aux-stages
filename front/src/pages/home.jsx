import Landing from "../components/home/landing.jsx";
import TopCompanies from "../components/home/topCompanies.jsx";
import CompanyCTA from "../components/home/companyCTA.jsx";
import LastOffers from "../components/home/lastOffers.jsx";
import LastRequests from "../components/home/lastRequests.jsx";

function Home() {
  return (
    <div className="space-y-16 flex flex-col items-center">
      <Landing />
      <TopCompanies />
      <CompanyCTA />
      <LastOffers />
      <LastRequests />
    </div>
  )
}

export default Home;
