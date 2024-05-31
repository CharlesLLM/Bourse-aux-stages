import React from 'react'
import CompanyList from '../components/company/companyList.jsx';
import Filters from '../components/filters.jsx';
import ListHero from '../components/listHero.jsx';

function CompanyIndex() {
  return (
    <div className="flex flex-col items-center">
      <ListHero
        titleWord="entreprises"
        subtitle="Découvrez les entreprises qui proposent des offres de stage ou d'alternance"
      />
      <div className="flex md:px-32 md:py-[72px] gap-16 w-full">
        <div className="w-52">
          <Filters />
        </div>
        <div className="w-auto">
          <CompanyList />
        </div>
      </div>
    </div>
  )
}

export default CompanyIndex;
