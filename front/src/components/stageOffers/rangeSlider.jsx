import React from "react";

function RangeSlider({ step, min, max, value, onSliderChange }) {
    // maj de la valeur au changement de l'input 
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
                min={min}
                max={max}
                step={step}
                onChange={handleChange}
                className="w-full appearance-none bg-[#898989] h-0.5 rounded-full outline-none focus:outline-none accent-primary 
                before:absolute before:left-0 before:top-2 before:bg-[#898989] before:h-[15px] before:w-0.5
                after:absolute after:right-0 after:top-2 after:bg-[#898989] after:h-[15px] after:w-0.5"
            />
            <p className="font-semibold text-blue-800 mt-2">A moins de {value} km</p>
        </React.Fragment>
    );
};

export default RangeSlider;
