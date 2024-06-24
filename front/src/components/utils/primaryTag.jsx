import PropTypes from 'prop-types';

function PrimaryTag({ text }) {
  return (
    <p className={`text-sm text-primary font-normal bg-lightGrey h-fit py-1 px-3 capitalize`}>{text}</p>
  );
}

PrimaryTag.propTypes = {
  text: PropTypes.string.isRequired,
};

export default PrimaryTag;
