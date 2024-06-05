import React from "react";
import PropTypes from "prop-types";

function RangeSlider({ value, onSliderChange }) {
  const handleChange = event => {
    event.preventDefault();
    const newValue = parseFloat(event.target.value);
    onSliderChange(newValue);
  };
  
  return (
    <React.Fragment>
      <input
        type="range"
        value={value}
        min={10}
        max={100}
        step={10}
        onChange={handleChange}
        className="w-full appearance-none bg-[#898989] h-0.5 rounded-full outline-none focus:outline-none accent-primary 
          before:absolute before:left-0 before:top-2 before:bg-[#898989] before:h-[15px] before:w-0.5
          after:absolute after:right-0 after:top-2 after:bg-[#898989] after:h-[15px] after:w-0.5"
      />
      {value !== "" && (
        <p className="font-semibold text-blue-800 mt-2">A moins de {value} km</p>
      )}
    </React.Fragment>
  );
};

RangeSlider.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onSliderChange: PropTypes.func.isRequired
};

export default RangeSlider;
