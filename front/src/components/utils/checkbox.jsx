import PropTypes from "prop-types";

function Checkbox({name, label, inputRef}) {
  return (
    <div className="flex items-center space-x-2">
      <input type="checkbox" ref={inputRef} className="checked:bg-primary w-5 h-5 rounded" name={name}/>
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputRef: PropTypes.object.isRequired
};

export default Checkbox;
