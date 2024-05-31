import { useState } from "react";
import PropTypes from 'prop-types';

function TagFilters({ tags, handleTags }) {
  const [selectedTags, setSelectedTags] = useState([]);

  const updateTags = (tags) => {
    setSelectedTags(tags);
    handleTags(tags);
  }

  return (
    <div className="space-y-5">
      <h3 className="font-bold">Secteurs d&apos;activité</h3>
      <div className="flex flex-col gap-5">
        {tags.map((tag) => (
          <div key={tag.id} className="checkbox">
            <label htmlFor={tag.id}>
              <input type="checkbox" id={tag.id} name={tag.name} value={tag.id} onChange={(e) => {
                if (e.target.checked) {
                  updateTags([...selectedTags, tag]);
                } else {
                  updateTags(selectedTags.filter((selectedTag) => selectedTag.id !== tag.id));
                }
              }} />
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleTags: PropTypes.func.isRequired,
};

export default TagFilters;
