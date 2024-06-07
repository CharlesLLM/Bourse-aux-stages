import React from "react";

export function Radio({name, label, inputRef, value, onChange}) {
  return (
    <div className="flex items-center space-x-2">
      <input onChange={onChange} type="radio" value={value} ref={inputRef} className="checked:bg-primary w-5 h-5 rounded-full" name={name}/>
      <label htmlFor={name}>{label}</label>
    </div>
  )
}
export default Radio