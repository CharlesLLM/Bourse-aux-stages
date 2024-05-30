import React from "react";

// For the moment, fake Filters component
function Filters() {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-lg font-semibold mb-4">Filtres</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="location" className="text-sm">Localisation</label>
          <input
            type="text"
            id="location"
            className="w-full border border-gray-200 rounded-lg p-2"
          />
        </div>
        <div>
          <label htmlFor="contract" className="text-sm">Type de contrat</label>
          <select
            id="contract"
            className="w-full border border-gray-200 rounded-lg p-2"
          >
            <option value="stage">Stage</option>
            <option value="alternance">Alternance</option>
          </select>
        </div>
        <div>
          <label htmlFor="sector" className="text-sm">Secteur d'activité</label>
          <select
            id="sector"
            className="w-full border border-gray-200 rounded-lg p-2"
          >
            <option value="informatique">Informatique</option>
            <option value="marketing">Marketing</option>
            <option value="finance">Finance</option>
          </select>
        </div>
        <div>
          <label htmlFor="contract" className="text-sm">Mots clés</label>
          <input
            type="text"
            id="keywords"
            className="w-full border border-gray-200 rounded-lg p-2"
          />
        </div>
        <button className="bg-blue-500 text-white rounded-lg p-2">Rechercher</button>
      </div>
    </div>
  );
}

export default Filters;
