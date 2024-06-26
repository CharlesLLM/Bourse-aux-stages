import PropTypes from 'prop-types';

function Radio({name, label, inputRef, value, onChange}) {
  return (
    <label htmlFor={value} className="flex items-center space-x-2">
      <input id={value} onChange={onChange} type="radio" value={value} ref={inputRef} className="checked:bg-primary w-5 h-5 rounded-full" name={name}/>
      <p>{label}</p>
    </label>
  )
}

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputRef: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Radio;
