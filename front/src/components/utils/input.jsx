import PropTypes from "prop-types";

function Input({label, name, required, inputRef, type, max = null, onFocus = null, onChange = null, onBlur = null, onKeyDown = null, disabled = false}) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-dark" htmlFor={name}>{label}<span className="text-red-700">{required ? '*' : ''}</span></label>
      <input name={name} onFocus={onFocus} onChange={onChange} onBlur={onBlur} ref={inputRef} maxLength={max} type={type} className="border border-grey/50 p-3.5 disabled:opacity-50 rounded-md" placeholder={label} onKeyDown={onKeyDown} disabled={disabled} />
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
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onFocus: PropTypes.func,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  required: false,
  inputRef: null,
  max: null,
  onFocus: null,
  onChange: null,
  onBlur: null,
  onKeyDown: null,
  disabled: false,
};

export default Input;
