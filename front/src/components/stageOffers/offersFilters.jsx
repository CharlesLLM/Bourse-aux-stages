import React, {useState} from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import RangeSlider from "./rangeSlider.jsx";
import CheckboxFilter from "./checkboxFilter.jsx";

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
              <RangeSlider value={selectedFilters.distance} step={sliderStep} min={sliderMin} max={sliderMax} onSliderChange={handleSliderChange} />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default OffersFilters;
