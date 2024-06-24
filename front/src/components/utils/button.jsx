import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function Button({text, path, blue = false}) {

  return (
    <Link to={path} className={`p-4 w-52 cursor-pointer ${blue ? 'bg-primary' : 'bg-white'}`}>
      <p className={` text-center ${blue ? 'text-white' : 'text-primary'}`}>{text}</p>
    </Link>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  blue: PropTypes.string,
};

export default Button;
