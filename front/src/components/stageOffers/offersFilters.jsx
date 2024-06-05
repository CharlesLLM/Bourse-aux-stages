import React, {useState} from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import RangeSlider from "./rangeSlider.jsx";
import CheckboxFilter from "./checkboxFilter.jsx";
import PropTypes from "prop-types";

const OffersFilters = ({ setSelectedFilters, selectedFilters, tags }) => {
  const [isVisibleDistance, setIsVisibleDistance] = useState(true);

  // maj des filtres quand les checkboxes change
  const handleCheckboxChange = (name, value) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [name]: prevState[name].includes(value)
        ? prevState[name].filter(item => item !== value)
        : [...prevState[name], value]
    }));
  };

  // maj des filtres pour le slider
  const handleSliderChange = value => {
    setSelectedFilters(prevState => ({
      ...prevState,
      distance: value
    }));
  };

  return (
    <React.Fragment>
      <div className="w-64 space-y-10">
        <CheckboxFilter
          title="Profils métiers"
          options={tags.map(tag => ({ name: 'profiles', value: tag.id, label: tag.name }))}
          selectedValues={selectedFilters.profiles}
          onCheckboxChange={handleCheckboxChange}
        />
        <CheckboxFilter
          title="Niveau recherché"
          options={[
            { name: 'levels', value: 'Master, DEA, DESS', label: 'Master, DEA, DESS' },
            { name: 'levels', value: 'Licence', label: 'Licence' },
            { name: 'levels', value: 'BTS, DUT, BUT', label: 'BTS, DUT, BUT' },
            { name: 'levels', value: 'Bac', label: 'BAC' },
            { name: 'levels', value: 'CAP, BEP', label: 'CAP, BEP' },
          ]}
          selectedValues={selectedFilters.levels}
          onCheckboxChange={handleCheckboxChange}
        />
        <CheckboxFilter
          title="Durée"
          options={[
            // Improve this part by using actual values
            { name: 'durations', value: "[1,59]", label: 'Moins de 2 mois' },
            { name: 'durations', value: "[60,180]", label: 'Entre 2 et 6 mois' },
            { name: 'durations', value: "[181,365]", label: 'Entre 6 et 12 mois' },
            { name: 'durations', value: "[365,9999]", label: 'Plus de 12 mois' },
          ]}
          selectedValues={selectedFilters.durations}
          onCheckboxChange={handleCheckboxChange}
        />

        <div className="space-y-5">
          <button className="text-xl flex flex-row justify-between w-full" onClick={() => setIsVisibleDistance(!isVisibleDistance)}>
            <p><span className="font-bold">Distance</span> - 0 à 100 km</p>
            <p className="pt-1">{isVisibleDistance ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
          </button>
          {isVisibleDistance && (
            <div className="relative w-full">
              <RangeSlider value={selectedFilters.distance} onSliderChange={handleSliderChange} />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

OffersFilters.propTypes = {
  setSelectedFilters: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    profiles: PropTypes.array,
    levels: PropTypes.array,
    durations: PropTypes.array,
    distance: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

export default OffersFilters;
