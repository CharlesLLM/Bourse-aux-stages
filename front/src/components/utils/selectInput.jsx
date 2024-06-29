import PropTypes from "prop-types";

function SelectInput({options = [], name, label, required, inputRef, value = null, disabled = false}) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-dark" htmlFor={name}>{label}<span className="text-red-700">{required ? '*' : ''}</span></label>
      <select name={name} ref={inputRef} className="border border-grey p-4 disabled:opacity-50" disabled={disabled}>
        <option value="" disabled defaultValue={value}> Veuillez choisir </option>
        {options.map((option) => (
          <option key={option.code ? option.code : option} value={option.code ? option.code : option}>{option.value ? option.value : option}</option>
        ))}
      </select>
    </div>
  )
}

SelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SelectInput;
