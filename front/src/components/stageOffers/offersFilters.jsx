import React, {useState} from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import RangeSlider from "./rangeSlider.jsx";
import CheckboxFilter from "./checkboxFilter.jsx";
import TagFilters from '../company/tagFilters.jsx';

const OffersFilters = ({ setSelectedFilters, selectedFilters, tags }) => {
  const [isVisibleDistance, setIsVisibleDistance] = useState(true);

  // Paramètres du slider
  const sliderStep = 1;
  const sliderMin = 1;
  const sliderMax = 100;

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

  const handleTags = tags => {
    setSelectedFilters({ ...selectedFilters, tags });
  };

  return (
    <React.Fragment>
      <div className="w-64 space-y-10">
        <TagFilters tags={tags} handleTags={handleTags} />
        <CheckboxFilter
          title="Niveau recherché"
          options={[
            { name: 'levelSearched', value: 'Master, DEA, DESS', label: 'Master, DEA, DESS' },
            { name: 'levelSearched', value: 'Licence', label: 'Licence' },
            { name: 'levelSearched', value: 'BTS, DUT, BUT', label: 'BTS, DUT, BUT' },
            { name: 'levelSearched', value: 'Bac', label: 'BAC' },
            { name: 'levelSearched', value: 'CAP, BEP', label: 'CAP, BEP' },
          ]}
          selectedValues={selectedFilters.levelSearched}
          onCheckboxChange={handleCheckboxChange}
        />
        <CheckboxFilter
          title="Durée"
          options={[
            { name: 'daysSpan', value: 'LESS_THAN_2', label: 'Moins de 2 mois' },
            { name: 'daysSpan', value: 'BETWEEN_2_AND_6', label: 'Entre 2 et 6 mois' },
            { name: 'daysSpan', value: 'BETWEEN_6_AND_12', label: 'Entre 6 et 12 mois' },
            { name: 'daysSpan', value: 'MORE_THAN_12', label: 'Plus de 12 mois' },
          ]}
          selectedValues={selectedFilters.daysSpan}
          onCheckboxChange={handleCheckboxChange}
        />

        <div className="space-y-5">
          <button className="text-xl flex flex-row justify-between w-full" onClick={() => setIsVisibleDistance(!isVisibleDistance)}>
            <p><span className="font-bold">Distance</span> - 0 à 100 km</p>
            <p className="pt-1">{isVisibleDistance ? <IoIosArrowUp /> : <IoIosArrowDown />}</p>
          </button>
          {isVisibleDistance && (
            <div className="relative w-full">
              <RangeSlider value={selectedFilters.distance} step={sliderStep} min={sliderMin} max={sliderMax} onSliderChange={handleSliderChange} />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OffersFilters;
