import { IoAdd } from "react-icons/io5";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

function AdminHeader({ name, logo, displayNewOfferButton = false }) {
  return (
    <div className="w-full flex justify-between items-center px-8 py-4 border-b border-borderGrey">
      <div className="flex items-center gap-4">
        <img src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${logo}`} alt={name} className="size-14 object-contain" />
        <h2 className="text-xl">{name}</h2>
      </div>
      {displayNewOfferButton && (
        <Link to="/admin" className="flex justify-center items-center gap-3 px-6 py-3 w-52 h-[50px] leading-none text-white bg-primary">
          <IoAdd className="size-8" />
          <p>Nouvelle offre</p>
        </Link>
      )}
    </div>
  );
}

AdminHeader.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  displayNewOfferButton: PropTypes.bool,
};

export default AdminHeader;
