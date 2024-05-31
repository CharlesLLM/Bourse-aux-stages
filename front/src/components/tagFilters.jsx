import React from "react";

function TagFilters({ tags }) {
  return (
    <div className="space-y-5">
      <h3 className="font-bold">Secteurs d'activité</h3>
      <div className="flex flex-col gap-5">
        {tags.map((tag) => (
          <div key={tag.id} className="checkbox">
            <label htmlFor={tag.id}>
              <input type="checkbox" id={tag.id} name={tag.name} value={tag.id} />
              <span className="checkbox-span"></span>
              <h3 className="font-normal">{tag.name}</h3>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagFilters;
