import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const CheckboxFilter = ({ title, options, selectedValues = [], onCheckboxChange }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="mb-6">
      <button className="font-bold text-xl flex flex-row justify-between w-full mb-7" onClick={() => setIsVisible(!isVisible)}>
        <p>{title}</p>
        <p className="pt-1">{isVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
      </button>
      {isVisible && (
        <div className="flex flex-col gap-6">
          {options.map((option, index) => (
            <div className="flex gap-4 items-center" key={index}>
              <input
                id={option.value}
                name={option.name}
                type="checkbox"
                value={option.value}
                className="w-6 h-6 accent-[#4640DE] shrink-0"
                checked={selectedValues.includes(option.value)}
                onChange={() => onCheckboxChange(option.name, option.value)}
              />
              <label htmlFor={option.value} className="text-lg">{option.label}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxFilter;