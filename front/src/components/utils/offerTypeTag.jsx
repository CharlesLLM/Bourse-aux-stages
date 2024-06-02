import PropTypes from 'prop-types';

function OfferTypeTag({ text }) {
  return (
    <p className={`text-sm text-primary font-normal bg-lightGrey h-fit py-1 px-3 capitalize`}>{text}</p>
  );
}

OfferTypeTag.propTypes = {
  text: PropTypes.string.isRequired,
};

export default OfferTypeTag;
