import React from 'react';
import { useEffect, useState } from 'react';
import CompanyList from '../components/company/companyList.jsx';
import Filters from '../components/tagFilters.jsx';
import ListHero from '../components/listHero.jsx';
import '../../assets/styles/form.scss';

function CompanyIndex() {
  const [companies, setCompanies] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  const handleTags = (selectedTags) => {
    getCompaniesWithFilters(selectedTags);
  };

  const getCompaniesWithFilters = async (selectedTags) => {
    let url = `${import.meta.env.VITE_BACK_ENDPOINT}companies`;
    if (selectedTags.length > 0) {
      url += `?tags=${selectedTags.map((tag) => tag.id).join(',')}`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCompanies(data);
    } catch (err) {
      setError(err);
      console.error('Error fetching data: ', err);
    }
  }

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}companies`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);

        const tags = data.map((company) => company.tags).flat();
        const uniqueTags = tags.filter((tag, index, self) => self.findIndex(t => t.id === tag.id) === index);

        setTags(uniqueTags);
      } catch (err) {
        setError(err);
        console.error('Error fetching data: ', err);
      }
    };

    getCompanies();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <ListHero
        titleWord="entreprises"
        subtitle="Découvrez les entreprises qui proposent des offres de stage ou d'alternance"
      />
      <div className="flex md:px-32 md:py-[72px] gap-16 w-full">
        <div className="w-52">
          <Filters tags={tags} handleTags={handleTags} />
        </div>
        <div className="w-auto">
          <CompanyList companies={companies} />
        </div>
      </div>
    </div>
  )
}

export default CompanyIndex;
