import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import PropTypes from "prop-types";

function LinkTo({ text, page, color }) {
  return (
    <Link to={`/${page}`} className={`text-${color} hover:text-lg transition-all flex items-center`}>
      {text}
      <FaArrowRight className="ml-2" />
    </Link>
  );
}

LinkTo.propTypes = {
  text: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default LinkTo;
