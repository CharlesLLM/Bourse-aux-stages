import PropTypes from 'prop-types';

function ListHero({ titleWord, subtitle }) {
  return (
    <div className="h-[250px] w-full bg-lightGrey flex flex-col items-center justify-center">
      <p className="text-5xl mb-10">Liste des&nbsp;
        <span className="text-secondary relative">
          {titleWord}
          <img src="underline.svg" alt="Underline" className="absolute top-full left-0 w-full" />
        </span>
      </p>
      <p className="text-lg font-normal text-textGrey">{subtitle}</p>
    </div>
  )
}

ListHero.propTypes = {
  titleWord: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default ListHero;
