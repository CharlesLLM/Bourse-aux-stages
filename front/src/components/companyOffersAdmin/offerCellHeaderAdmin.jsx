import { useMemo } from "react";

const OfferCellHeaderAdmin = ({ onOrderBy }) => {
  const headers = useMemo(() => [
    { key: "name", label: "Nom de l'offre", css: "w-64"},
    { key: "promoteStatus", label: "Statut", css: "w-38"},
    { key: "publishDate", label: "Date publication", css: "w-38"},
    { key: "endDate", label: "Date limite", css: "w-38"},
    { key: "type", label: "Type", css: "w-38"},
    { key: "applications", label: "Candidatures", css: "w-38"},
    { key: "actions", label: "", css:"w-16"}
  ], []);

    return (
        <thead className="text-textGrey text-md bg-white border border-borderGrey">
            <tr>
                {headers.map(header => (
                    <th scope="col" key={header.key} className={`px-6 py-3 hover:cursor-pointer hover:text-black ${header.css}`} onClick={() => onOrderBy(header.key)}>
                        {header.label}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default OfferCellHeaderAdmin;
