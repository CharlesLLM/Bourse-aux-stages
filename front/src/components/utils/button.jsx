import React from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import LinkTo from "./linkTo.jsx";


function Button({text, path, blue = false}) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(path)} className={`p-4 w-52 cursor-pointer ${blue ? 'bg-primary' : 'bg-white'}`}>
      <p className={` text-center ${blue ? 'text-white' : 'text-primary'}`}>{text}</p>
    </div>
  )
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  blue: PropTypes.string.isRequired,
};

export default Button;