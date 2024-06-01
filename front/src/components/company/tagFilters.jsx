import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

function TagFilters({ tags, handleTags }) {
  const [selectedTags, setSelectedTags] = useState(["all"]);

  useEffect(() => {
    if (selectedTags.includes("all")) {
      handleTags([]);
    } else {
      handleTags(selectedTags);
    }
  }, [selectedTags]);

  const handleChange = (e, tag) => {
    if (tag === "all") {
      if (e.target.checked) {
        setSelectedTags(["all"]);
      }
    } else {
      if (e.target.checked) {
        setSelectedTags(selectedTags.filter(tag => tag !== "all").concat(tag));
      } else {
        const newTags = selectedTags.filter(selectedTag => selectedTag !== tag);
        if (newTags.length === 0) {
          setSelectedTags(["all"]);
        } else {
          setSelectedTags(newTags);
        }
      }
    }
  }

  return (
    <div className="space-y-5">
      <h3 className="font-bold">Secteurs d&apos;activité</h3>
      <div className="flex flex-col gap-5">
        <div key="tag-all" className="checkbox">
          <label htmlFor="tag-all">
            <input type="checkbox" id="tag-all" name="tag-all" checked={selectedTags.includes("all")} onChange={(e) => handleChange(e, "all")} />
            <span className="checkbox-span"></span>
            <h3 className="font-normal">Tous</h3>
          </label>
        </div>
        {tags.map((tag) => (
          <div key={tag.id} className="checkbox">
            <label htmlFor={tag.id}>
              <input type="checkbox" id={tag.id} name={tag.name} value={tag.id} checked={selectedTags.includes(tag)} onChange={(e) => handleChange(e, tag)} />
              <span className="checkbox-span"></span>
              <h3 className="font-normal">{tag.name}</h3>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

TagFilters.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleTags: PropTypes.func.isRequired,
};

export default TagFilters;
