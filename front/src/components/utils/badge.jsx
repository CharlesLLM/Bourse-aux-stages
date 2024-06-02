import PropTypes from 'prop-types';

function Badge({ variant, tag }) {
  switch (variant) {
    case "companyTag":
      return (
        <span style={{borderColor: tag.color, color: tag.color}} className="border border-solid rounded-full font-normal px-3 py-1 h-fit capitalize">
          {tag.name}
        </span>
      );
    case "offerTag":
      return (
        <span style={{backgroundColor: `${tag.color}1A`, color: tag.color}} className="rounded-full text-sm font-semibold px-4 py-2 h-fit capitalize">
          {tag.name}
        </span>
      );
    default:
      return (
        <span className="bg-lightGrey text-primary font-normal px-3 py-1 h-fit capitalize">
          {tag.name}
        </span>
      );
  }
}

Badge.propTypes = {
  variant: PropTypes.string,
  tag: PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Badge;
