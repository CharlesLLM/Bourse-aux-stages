import React from "react";
import Pagination from "../utils/pagination.jsx";
import OfferCell from "./offerCell.jsx";

function OffersList({ data, currentPage, setCurrentPage, PageSize, nbOffers }) {
  return (
    <div>
      <div className="flex flex-col gap-4 md:px-12 md:mx-0">
        {data.map((offer, index) => (
          <OfferCell
            key={index}
            offer={offer}
          />
        ))}
      </div>
      <div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={nbOffers}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default OffersList;
