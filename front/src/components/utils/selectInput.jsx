import React from "react";
import PropTypes from "prop-types";

function SelectInput({options = [], name, label, required, inputRef}) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-dark" htmlFor={name}>{label}<span className="text-red-700">{required ? '*' : ''}</span></label>
      <select name={name} ref={inputRef} className="border border-grey p-4">
        <option value="" disabled selected> Veuillez choisir </option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}


SelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
export default SelectInput