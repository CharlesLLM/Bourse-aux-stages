import React, {useEffect, useState} from "react";
import { FaPlus } from "react-icons/fa";


const OfferAdminHeader = ({ company, showCreateButton = true }) => {
  return (
        <div className="border-b border-borderGrey ml-2">
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
                {showCreateButton && (
                    <a 
                    href="./creer-offre" 
                    className="flex flex-row gap-2 flex-nowrap justify-center items-center px-6 py-3 w-48 h-[50px] leading-none text-white bg-primary"> 
                        <FaPlus className="mb-1"/> 
                        Nouvelle offre 
                    </a>
                )}
            </div>
        </div>
    );
};

export default OfferAdminHeader;
