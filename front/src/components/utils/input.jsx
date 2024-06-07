import PropTypes from "prop-types";

function Input({label, name, required, inputRef, type, max = null}) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-dark" htmlFor={name}>{label}<span className="text-red-700">{required ? '*' : ''}</span></label>
      <input name={name} ref={inputRef} max={max} type={type} className={`border border-grey/50 p-3.5`} placeholder={label} />
    </div>
  )
}
Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  type: PropTypes.string.isRequired,
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Input.defaultProps = {
  required: false,
  inputRef: null,
  max: null
};

export default Input;
