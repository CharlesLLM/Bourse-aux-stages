import React from "react";

function SelectInput({options, name, label, required, inputRef}) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-dark" htmlFor={name}>{label}<span className="text-red-700">{required ? '*' : ''}</span></label>
      <select name={name} ref={inputRef} className="border border-grey p-4">
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
export default SelectInput