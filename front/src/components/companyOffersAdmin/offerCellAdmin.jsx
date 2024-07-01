import PropTypes from "prop-types";
import { BsThreeDots } from "react-icons/bs";

const OfferCellAdmin = ({ offer }) => {
  const applications = "20";

  return (
    <tr className="bg-white border-b h-20 odd:bg-lightGrey text-[#25324B]">
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        <h3 className="text-md font-bold">  {offer.name.length > 35 ? `${offer.name.substring(0, 32)}...` : offer.name}</h3>
      </th>
      <td className="px-6 py-4">
        {offer.active && (
          <p className="rounded-full border-[#56CDAD] border-2 text-center p-2 text-[#56CDAD] max-w-28">
            active
          </p>
        ) || (
          <p className="rounded-full border-[#FF6550] border-2 text-center p-2 text-[#FF6550] max-w-28">
            clôturé
          </p>
        )}
      </td>
      <td className="px-6 py-4">
        <p>{new Date(offer.endPublicationDate).toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      </td>
      <td className="px-6 py-4">
        <p>{new Date(offer.endDate).toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      </td>
      <td className="px-6 py-4">
        {offer.type == "stage" && (
          <p className="rounded-full border-[#4640DE] border-2 text-center p-2 text-[#4640DE] max-w-28">
            {offer.type }
          </p>
        ) || (
          <p className="rounded-full border-[#FFB836] border-2 text-center p-2 text-[#FFB836] max-w-28">
            {offer.type }
          </p>
        )}
      </td>
      <td className="px-6 py-4">
        <p>{applications}</p>
      </td>
      <td>
        <BsThreeDots className="text-2xl"/>
      </td>
    </tr>
  );
};

export default OfferCellAdmin;
