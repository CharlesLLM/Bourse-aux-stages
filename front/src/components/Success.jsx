import {FaCheck} from "react-icons/fa";
import Button from "./utils/button.jsx";
import PropTypes from "prop-types";

function Success({desc, path, text}) {
  return (
    <div className="flex flex-col items-center justify-center h-dvh space-y-12">
      <FaCheck className="text-primary text-8xl"/>
      <div className="text-center w-1/2">
        <p className="text-4xl text-primary">{desc}</p>
      </div>
      <Button path={path} text={text} blue="true"/>
    </div>
  )
}
Success.propTypes = {
  desc: PropTypes.string,
  path: PropTypes.string,
  text: PropTypes.string,
}

export default Success;
