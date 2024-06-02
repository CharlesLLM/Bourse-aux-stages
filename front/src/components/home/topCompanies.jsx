import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function topCompanies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

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
        setError(err);
      }
    };

    getTopCompanies();
  }, []);

  return (
    <div className="space-y-6 w-full px-32 !mt-12">
      <p className="text-lg font-normal">Entreprises à la une</p>
      <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-5 gap-8">
        {companies.length > 0 && companies.map((company) => (
          <div key={company.id} className="flex justify-center items-center">
            <img
              src={company.logo ? `${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${company.logo}` : "/placeholder.webp"}
              className="max-w-40 max-h-28 object-contain cursor-pointer"
              onClick={() => navigate(`/company/${company.slug}`)}
              alt="companyLogo"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default topCompanies;
