import PropTypes from "prop-types";
import {useState} from "react";

function Checkbox({name, label, inputRef, initialValue = false}) {
  const [isChecked, setIsChecked] = useState(initialValue);
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        ref={inputRef}
        className="checked:bg-primary w-5 h-5 rounded"
        name={name}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputRef: PropTypes.object.isRequired,
  initialValue: PropTypes.object,
};

export default Checkbox;
