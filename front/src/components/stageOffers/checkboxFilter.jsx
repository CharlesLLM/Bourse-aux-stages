import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const CheckboxFilter = ({ title, options, selectedValues = [], onCheckboxChange }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="space-y-5">
      <button className="font-bold text-xl flex flex-row justify-between w-full" onClick={() => setIsVisible(!isVisible)}>
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

export default CheckboxFilter;
