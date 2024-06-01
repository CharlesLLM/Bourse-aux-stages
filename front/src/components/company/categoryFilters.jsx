import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function CategoryFilters({ categories, handleCategories }) {
  const [selectedCategories, setSelectedCategories] = useState(["all"]);

  useEffect(() => {
    if (selectedCategories.includes("all")) {
      handleCategories([]);
    } else {
      handleCategories(selectedCategories);
    }
  }, [selectedCategories]);

  const handleChange = (e, category) => {
    if (category === "all") {
      if (e.target.checked) {
        setSelectedCategories(["all"]);
      }
    } else {
      if (e.target.checked) {
        setSelectedCategories(selectedCategories.filter(category => category !== "all").concat(category));
      } else {
        const newCategories = selectedCategories.filter(selectedCategory => selectedCategory !== category);
        if (newCategories.length === 0) {
          setSelectedCategories(["all"]);
        } else {
          setSelectedCategories(newCategories);
        }
      }
    }
  }

  return (
    <div className="space-y-5">
      <h3 className="font-bold">Catégorie</h3>
      <div className="flex flex-col gap-5">
        <div key="category-all" className="checkbox">
          <label htmlFor="category-all">
            <input type="checkbox"
              id="category-all"
              name="category-all"
              checked={selectedCategories.includes("all")} 
              onChange={(e) => handleChange(e, "all")}
            />
            <span className="checkbox-span"></span>
            <h3 className="font-normal">Tous</h3>
          </label>
        </div>
        {categories.map((category) => (
          <div key={category.id} className="checkbox">
            <label htmlFor={category.id}>
              <input type="checkbox"
                id={category.id}
                name={category.name}
                value={category.id}
                checked={selectedCategories.includes(category)}
                onChange={(e) => handleChange(e, category)}
              />
              <span className="checkbox-span"></span>
              <h3 className="font-normal">{category.name}</h3>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

CategoryFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleCategories: PropTypes.func.isRequired,
};

export default CategoryFilters;
