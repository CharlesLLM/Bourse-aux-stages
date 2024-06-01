import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function SizeFilters({ handleSizes }) {
  const sizes = [
    { id: 1, name: "1-9", value: [1, 9] },
    { id: 2, name: "10-49", value: [10, 49] },
    { id: 3, name: "50-99", value: [50, 99] },
    { id: 4, name: "100-249", value: [100, 249] },
    { id: 5, name: "250-999", value: [250, 999] },
    { id: 6, name: "1000 et plus", value: [1000, 999999] },
  ];

  const [selectedSizes, setSelectedSizes] = useState(sizes);

  useEffect(() => {
    handleSizes(selectedSizes);
  }, [selectedSizes]);

  const handleChange = (e, size) => {
    if (e.target.checked) {
      setSelectedSizes([...selectedSizes, size]);
    } else {
      const newSizes = selectedSizes.filter(selectedSize => selectedSize.id !== size.id);
      setSelectedSizes(newSizes);
    }
  }

  return (
    <div className="space-y-5">
      <h3 className="font-bold">Effectif</h3>
      <div className="flex flex-col gap-5">
        {sizes.map((size) => (
          <div key={size.id} className="checkbox">
            <label htmlFor={size.id}>
              <input type="checkbox"
                id={size.id}
                name={size.name}
                value={size.id}
                checked={selectedSizes.some(selectedSize => selectedSize.id === size.id)}
                onChange={(e) => handleChange(e, size)}
              />
              <span className="checkbox-span"></span>
              <h3 className="font-normal">{size.name}</h3>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

SizeFilters.propTypes = {
  handleSizes: PropTypes.func.isRequired,
};

export default SizeFilters;
