import React from "react";

const RangeSlider = ({ step, min, max, value, onSliderChange }) => {
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
                className="w-full appearance-none bg-[#25324B] h-0.5 rounded-full outline-none focus:outline-none accent-[#4640DE] 
                before:content-['.'] before:block before:absolute -before:left-0 -before:text-xl before:top-2 -before:-z-10 before:text-[#25324B] before:text-sm before:bg-[#25324B] before:w-0.5
                after:content-['.'] after:block after:absolute after:right-0 -after:text-3xl after:top-2 -after:-z-10 after:text-[#25324B] after:text-sm after:bg-[#25324B] after:w-0.5"
            />
            <p className="font-semibold text-blue-800 mt-2">A moins de {value} km</p>
        </React.Fragment>
    );
};

export default RangeSlider;
