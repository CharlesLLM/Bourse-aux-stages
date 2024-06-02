import PropTypes from 'prop-types';
import Breadcrumb from './utils/breadcrumb.jsx';

function ListHero({ mainText, subtitle, breadcrumb }) {
  const textParts = mainText.split(' ');
  const textLastWord = textParts.pop();
  const textFirstPart = textParts.join(' ');

  return (
    <div className="h-[250px] w-full bg-lightGrey px-32 flex flex-col pt-5 pb-10 gap-8">
      <Breadcrumb links={breadcrumb} />
      <div className="flex flex-col items-center justify-center">
        <p className="text-5xl mb-10">{textFirstPart}&nbsp;
          <span className="text-secondary relative">
            {textLastWord}
            <img src="underline.svg" alt="Underline" className="absolute top-full left-0 w-full" />
          </span>
        </p>
        <p className="text-lg font-normal text-textGrey">{subtitle}</p>
      </div>
    </div>
  )
}

ListHero.propTypes = {
  titleWord: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  breadcrumb: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
};

export default ListHero;
