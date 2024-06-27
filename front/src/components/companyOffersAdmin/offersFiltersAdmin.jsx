import React from 'react';
import CheckboxFilter from "../stageOffers/checkboxFilter.jsx";
import PropTypes from "prop-types";

const OffersFiltersAdmin = ({ setSelectedFilters, selectedFilters }) => {

  // maj des filtres quand les checkboxes change
  const handleCheckboxChange = (name, value) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [name]: prevState[name].includes(value)
        ? prevState[name].filter(item => item !== value)
        : [...prevState[name], value]
    }));
  };

  return (
    <React.Fragment>
      <div className="w-64 space-y-10">
        <CheckboxFilter
          title="Types d'offre affichées"
          options={[
            { name: 'offerTypes', value: 'offres_actives', label: 'Offres actives' },
            { name: 'offerTypes', value: 'offres_clotures', label: 'Offres clôturées' },
          ]}
          selectedValues={selectedFilters.offerTypes}
          onCheckboxChange={handleCheckboxChange}
          defaultVisible={false}
        />
      </div>
    </React.Fragment>
  );
};

OffersFiltersAdmin.propTypes = {
  setSelectedFilters: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    offerTypes: PropTypes.array,
  }).isRequired,
};

export default OffersFiltersAdmin;
