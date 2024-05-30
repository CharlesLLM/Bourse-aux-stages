import React from "react";
import { useEffect, useState } from "react";
import CompanyCard from "./companyCard";
import { useNavigate } from "react-router-dom";

function CompanyList() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect( () => {
    const getCompanies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}companies`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err);
      }
    };

    getCompanies();
  }, []);

  return (
    <>
      <div className="flex items-center mb-6">
        <div className="space-y-1">
          <h2 className="text-[32px] leading-none font-semibold">Résultats</h2>
          <p className="text-darkGray font-normal">{companies.length} entreprises trouvées</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </>
  );
}

export default CompanyList;
