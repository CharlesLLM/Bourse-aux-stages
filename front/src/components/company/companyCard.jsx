import React from "react";
import Badge from "../badge";

function CompanyCard({ company }) {
  const stagesNumber = company.offers.filter(offer => offer.type === "stage").length;
  const apprenticeshipsNumber = company.offers.length - stagesNumber;

  return (
    <div className="bg-white shadow-md p-6 w-full max-w-[440px]">
      <div className="flex justify-between mb-6">
        <img
          src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${company.logo}`}
          alt={company.name}
          className="w-20 h-20 object-cover"
        />
        <span className="bg-lightGrey text-primary font-normal px-3 py-1 h-fit">
          {stagesNumber > 0 && `${stagesNumber} stage${stagesNumber > 1 ? "s" : ""}`}
          {stagesNumber > 0 && apprenticeshipsNumber > 0 && ", "}
          {apprenticeshipsNumber > 0 && `${apprenticeshipsNumber} alternance${apprenticeshipsNumber > 1 ? "s" : ""}`}
        </span>
      </div>
      <h2 className="text-2xl font-semibold mb-3">{company.name}</h2>
      <p className="text-lg text-gray-600 font-normal mb-4 line-clamp-4">{company.summary}</p>
      <div className="flex flex-wrap gap-4">
        {company.tags.map((tag) => (
          <Badge key={`${company.id}-${tag.id}`} variant="companyTag" tag={tag} />
        ))}
      </div>
    </div>
  );
}

export default CompanyCard;
