import React from "react";

function Input({size, label, name, required, inputRef, type, max = null}) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-dark" for={name}>{label}<span className="text-red-700">{required ? '*' : ''}</span></label>
      <input name={name} ref={inputRef} max={max} type={type} className={`border border-grey/50 p-3.5 w-${size}`} placeholder={label} />
    </div>
  )
}
export default Input