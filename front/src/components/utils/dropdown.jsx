import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { IoIosArrowDown } from "react-icons/io";

function Dropdown({ togglerText, items }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="flex items-center relative group h-full">
      <div className="flex items-center gap-1">
        <p className="cursor-pointer pr-5" onClick={toggle}>{togglerText}</p>
        <IoIosArrowDown className={`text-primary size-4 absolute right-0 transform duration-200 ${open && 'transform rotate-180'}`} />
      </div>
      {open && (
        <ul className="absolute top-full w-32 z-20 bg-white rounded shadow-lg transition-all duration-500 transform opacity-100 translate-y-0">
          {items.map((item, index) => (
            <div key={index}>
              {item.url ?
                <Link to={item.url} className="flex items-center px-4 py-2 border-l-2 border-white hover:bg-lightGrey hover:border-primary">
                  <li className="whitespace-nowrap">{item.text}</li>
                </Link>
              :
                <li className="flex items-center px-4 py-2 border-l-2 border-white hover:bg-lightGrey hover:border-primary whitespace-nowrap">{item.text}</li>
              }
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  togglerText: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    url: PropTypes.string,
    onClick: PropTypes.func
  }))
}

export default Dropdown;
