import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import RangeSlider from "../utils/rangeSlider.jsx";
import CheckboxFilter from "../stageOffers/checkboxFilter.jsx";
import PropTypes from "prop-types";

const CompanyFilters = ({ setSelectedFilters, selectedFilters, tags, categories }) => {
  const [isVisibleDistance, setIsVisibleDistance] = useState(true);

  const handleCheckboxChange = (name, value) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [name]: prevState[name].includes(value)
        ? prevState[name].filter(item => item !== value)
        : [...prevState[name], value]
    }));
  };

  const handleSliderChange = value => {
    setSelectedFilters(prevState => ({
      ...prevState,
      distance: value
    }));
  };

  const sizes = [
    { id: 1, name: "1-9", value: "[1,9]" },
    { id: 2, name: "10-49", value: "[10,49]" },
    { id: 3, name: "50-99", value: "[50,99]" },
    { id: 4, name: "100-249", value: "[100,249]" },
    { id: 5, name: "250-999", value: "[250,999]" },
    { id: 6, name: "1000 et plus", value: "[1000,999999]" },
  ];

  return (
    <div className="w-64 space-y-10">
      <CheckboxFilter
        title="Secteurs d'activité"
        options={tags.map(tag => ({ name: 'tags', value: tag.id, label: tag.name }))}
        selectedValues={selectedFilters.tags}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxFilter
        title="Catégorie"
        options={categories.map(category => ({ name: 'categories', value: category.id, label: category.name }))}
        selectedValues={selectedFilters.categories}
        onCheckboxChange={handleCheckboxChange}
      />
      <CheckboxFilter
        title="Effectifs"
        options={sizes.map(size => ({ name: 'sizes', value: size.value, label: size.name }))}
        selectedValues={selectedFilters.sizes}
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
  );
};

CompanyFilters.propTypes = {
  setSelectedFilters: PropTypes.func.isRequired,
  selectedFilters: PropTypes.shape({
    tags: PropTypes.array,
    categories: PropTypes.array,
    sizes: PropTypes.array,
    distance: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }).isRequired,
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

export default CompanyFilters;
