import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import PropTypes from 'prop-types';

const CheckboxFilter = ({ title, options, selectedValues = [], onCheckboxChange, defaultVisible = true }) => {
  const [isVisible, setIsVisible] = useState(defaultVisible);

  return (
    <div className="space-y-5">
      <button className="font-bold flex flex-row justify-between w-full" onClick={() => setIsVisible(!isVisible)}>
        <p>{title}</p>
        <p className="pt-1">{isVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
      </button>
      {isVisible && (
        <div className="flex flex-col gap-6">
          {options.map((option, index) => (
            <div key={index} className="checkbox">
              <label htmlFor={option.value}>
                <input
                  id={option.value}
                  name={option.name}
                  type="checkbox"
                  value={option.value}
                  checked={selectedValues.includes(option.value)}
                  onChange={() => onCheckboxChange(option.name, option.value)}
                  />
                <span className="checkbox-span"></span>
                <h3 className="font-normal">{option.label}</h3>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

CheckboxFilter.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  selectedValues: PropTypes.array,
  onCheckboxChange: PropTypes.func.isRequired
};

export default CheckboxFilter;
