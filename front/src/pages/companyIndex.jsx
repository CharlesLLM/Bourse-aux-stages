import { useEffect, useState } from 'react';
import CompanyCard from '../components/company/companyCard.jsx';
import Filters from '../components/company/tagFilters.jsx';
import ListHero from '../components/listHero.jsx';
import '../../assets/styles/form.scss';

function CompanyIndex() {
  const [companies, setCompanies] = useState([]);
  const [tags, setTags] = useState([]);

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
          <div className="flex items-center mb-6">
            <div className="space-y-1">
              <h2 className="text-[32px] leading-none font-semibold">Résultats</h2>
              <p className="text-darkGray font-normal">{companies.length} entreprises trouvées</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {companies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyIndex;
