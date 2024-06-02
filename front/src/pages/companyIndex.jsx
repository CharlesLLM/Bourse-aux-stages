import { useEffect, useState } from 'react';
import CompanyCard from '../components/company/companyCard.jsx';
import CategoryFilters from '../components/company/categoryFilters.jsx';
import SizeFilters from '../components/company/sizeFilters.jsx';
import TagFilters from '../components/company/tagFilters.jsx';
import ListHero from '../components/listHero.jsx';
import '../../assets/styles/form.scss';

function CompanyIndex() {
  const [companies, setCompanies] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  useEffect(() => {
    const getCompanies = async () => {
      let url = `${import.meta.env.VITE_BACK_ENDPOINT}companies`;
      url += `?tags=${selectedTags.map((tag) => tag.id).join(',')}`;
      url += `&categories=${selectedCategories.map((category) => category.id).join(',')}`;
      url += `&sizes=${JSON.stringify(selectedSizes.map((size) => size.value))}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);

        if (selectedTags.length === 0 && selectedCategories.length === 0 && selectedSizes.length === 0) {
          const tags = data.map((company) => company.tags).flat();
          const uniqueTags = tags.filter((tag, index, self) => self.findIndex(t => t.id === tag.id) === index);
          setTags(uniqueTags);

          const categories = data.map((company) => company.category).flat();
          const uniqueCategories = categories.filter((category, index, self) => self.findIndex(c => c.id === category.id) === index);
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getCompanies();
  }, [selectedTags, selectedCategories, selectedSizes]);

  const handleTags = (selectedTags) => {
    setSelectedTags(selectedTags);
  };

  const handleCategories = (selectedCategories) => {
    setSelectedCategories(selectedCategories);
  };

  const handleSizes = (selectedSizes) => {
    setSelectedSizes(selectedSizes);
  };

  return (
    <div className="flex flex-col items-center">
      <ListHero
        mainText="Liste des entreprises"
        subtitle="Découvrez les entreprises qui proposent des offres de stage ou d'alternance"
        breadcrumb={[{ name: 'Accueil', href: '/' }, { name: 'Entreprises', href: '/entreprises' }]}
      />
      <div className="flex md:px-32 md:py-[72px] gap-16 w-full">
        <div className="w-64 space-y-10">
          <TagFilters tags={tags} handleTags={handleTags} />
          <CategoryFilters categories={categories} handleCategories={handleCategories} />
          <SizeFilters handleSizes={handleSizes} />
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
