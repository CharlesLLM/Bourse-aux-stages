import { useMemo } from "react";

const range = (start, end) => {
  let length = end - start + 1;
  /*
  	Crée un tableau énumérent tt les index de start à end
  */
  return Array.from({ length }, (_, index) => index + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  //siblingCount = nb de cases voisines à afficher par rapport à l'index de page affiché à l'écran
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Le nombre de cases de la pagination est déterminé par siblingCount + premièrePage + dernièrePage + currentPage + 2*[...] (ex: 1 ... 3 4 5 ... 7)
    const totalPageNumbers = siblingCount + 5;

    /*
      Cas 1 :
      Si le nombre de pages est inférieur au nombre de cases  que nous souhaitons afficher dans notre
      composant de pagination, nous renvoyons la plage [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
	
    /*
    	Calcul des index des voisins de gauche et de droite et assurer qu'ils sont dans la plage 1 et totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      pas de [...] s'il y a seulement un numéro de page à insérer entre la première/dernière case et les cases voisines de la case affiché
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Cas 2 : Pas de [...] à gauche à afficher, mais des [...] à droite doivent être affichés
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, "dots", totalPageCount];
    }

    /*
    	Cas 3 : Pas de [...] à droite à afficher, mais des [...] à gauche doivent être affichés
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, "dots", ...rightRange];
    }
     
    /*
    	Cas 4 : Les [...] doivent être affichés à la fois à gauche et à droite
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "dots", ...middleRange, "dots", lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
