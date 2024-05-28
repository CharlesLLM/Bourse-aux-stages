import React from "react";

export function Checkbox({name, label, inputRef}) {
  return (
    <div className="flex items-center space-x-2">
      <input type="checkbox" ref={inputRef} className="checked:bg-primary w-5 h-5 rounded" name={name}/>
      <label for={name}>{label}</label>
    </div>
  )
}
export default Checkbox