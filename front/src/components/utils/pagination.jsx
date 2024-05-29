import React from 'react';
import classnames from 'classnames';
import {usePagination} from './usePagination';
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

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
      className="flex flex-row justify-center items-center gap-10 my-10"
    >
      {/* Flèche de navigation gauche */}
      <li
        className={classnames('text-xl cursor-pointer', {
          "hidden": currentPage === 1
        })}
        onClick={onPrevious}
      >
        <MdArrowBackIos />
      </li>

      {paginationRange.map(pageNumber => {
         
        // cas ou l'élément est un dots 
        if (pageNumber === "dots") {
          return <li className="text-xl cursor-default	">...</li>;
        }
		
        // Affichage des éléments de pagination (page 1, 2, 3...)
        return (
          <li
            className={classnames('text-xl cursor-pointer', {
              "w-16 h-16 rounded-lg bg-[#4640DE] flex items-center justify-center text-white": pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/* Flèche de navigation droite */}
      <li
        className={classnames('text-xl cursor-pointer', {
            "hidden": currentPage === lastPage
          })}
        onClick={onNext}
      >
        <MdArrowForwardIos />
      </li>
    </ul>
  );
};

export default Pagination;