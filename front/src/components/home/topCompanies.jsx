import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TopCompanies() {
  const [companies, setCompanies] = useState([]);

  useEffect( () => {
    const getTopCompanies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}companies/top`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getTopCompanies();
  }, []);

  return (
    <div className="space-y-6 w-full px-32 !mt-12">
      <p className="text-lg font-normal">Entreprises à la une</p>
      <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 gap-8">
        {companies.length > 0 && companies.map((company) => (
          <Link to={`/entreprise/${company.slug}`} key={company.id} className="flex justify-center items-center">
            <img
              src={company.logo ? `${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${company.logo}` : "/placeholder.webp"}
              className="max-w-40 max-h-28 object-contain cursor-pointer"
              alt="companyLogo"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TopCompanies;
