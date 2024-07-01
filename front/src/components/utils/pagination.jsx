import classnames from 'classnames';
import {usePagination} from './usePagination';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import PropTypes from 'prop-types';

function Pagination ({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize }) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // Si la plage de pagination contient moins de 2 éléments le composant n'est pas affiché car pas nécessaire
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className="flex flex-row flex-wrap justify-center items-center gap-2"
    >
      {/* Flèche de navigation gauche */}
      <li
        className={classnames('w-10 h-10 rounded-lg flex justify-center items-center text-base text-primary cursor-pointer', {
          "hidden": currentPage === 1
        })}
        onClick={onPrevious}
      >
        <MdArrowBackIos />
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === "dots") {
          return <li key={`dots-${index}`} className="w-10 h-10 rounded-lg flex justify-center items-center text-base text-[#7C8493] cursor-default	">...</li>;
        }
		
        // Affichage des éléments de pagination (page 1, 2, 3...)
        return (
          <li
            key={pageNumber}
            className={classnames('w-10 h-10 rounded-lg flex justify-center items-center text-base text-[#7C8493] cursor-pointer', {
              "bg-primary !text-white": pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/* Flèche de navigation droite */}
      <li
        className={classnames('w-10 h-10 rounded-lg flex justify-center items-center text-base text-primary cursor-pointer', {
            "hidden": currentPage === lastPage
          })}
        onClick={onNext}
      >
        <MdArrowForwardIos />
      </li>
    </ul>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
