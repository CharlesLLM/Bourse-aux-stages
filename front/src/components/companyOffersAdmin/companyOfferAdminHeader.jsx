import React, {useEffect, useState} from "react";
import { FaPlus } from "react-icons/fa";


const CompanyOfferAdminHeader = ({ companyName = "" }) => {
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const getCompany = async () => {
            let url = `${import.meta.env.VITE_BACK_ENDPOINT}company/${companyName}`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCompany(data);
          } catch (err) {
            console.error('Error fetching data: ', err);
          }
        };
        getCompany();
    }, [companyName]);

  return (
        <div className="border-b border-[#D6DDEB] ml-2">
            <div className="flex flex-row justify-between md:px-32 mb-6">
                {company && (
                    <div className="flex flex-row flex-nowrap items-center gap-8">
                        <img
                        src={`${import.meta.env.VITE_BACK_ENDPOINT}uploads/company/${company.logo}`}
                        alt={company.name}
                        className="w-auto h-[50px] object-contain"/>
                        <h2 className="text-xl"> {company.name} </h2>
                    </div>
                )}
                <a href="./creer-offre" className="flex flex-row gap-2 flex-nowrap justify-center items-center px-6 py-3 w-48 h-[50px] leading-none text-white bg-primary"> <FaPlus className="mb-1"/> Nouvelle offre </a>
            </div>
        </div>
    );
};

export default CompanyOfferAdminHeader;
