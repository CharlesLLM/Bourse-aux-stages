import { useEffect, useMemo, useState } from 'react';
import Container from '../layout/container.jsx';
import CompanyCard from '../components/company/companyCard.jsx';
import CompanyFilters from '../components/company/companyFilters.jsx';
import Pagination from "../components/utils/pagination.jsx";
import ListHero from '../components/listHero.jsx';
import { IoIosArrowDown } from "react-icons/io";
import '../../assets/styles/form.scss';

function CompanyIndex() {
  const [companies, setCompanies] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("MOST_RECENT");
  const [selectedFilters, setSelectedFilters] = useState({
    tags: [],
    categories: [],
    sizes: [],
    distance: "",
  });
  const pageSize = 8;

  useEffect(() => {
    const getCompanies = async () => {
      let url = `${import.meta.env.VITE_BACK_ENDPOINT}companies`;
      url += `?tags=${selectedFilters.tags}`;
      url += `&categories=${selectedFilters.categories}`;
      url += `&sizes=[${selectedFilters.sizes}]`
      url += `&distance=${selectedFilters.distance ? selectedFilters.distance : 0}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompanies(data);

        // On first fetch, get all tags and categories
        if (selectedFilters.distance === "") {
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
  }, [selectedFilters]);

  const sortedData = useMemo(() => {
    const sorted = [...companies];
    if (sortOption === "NAME_ASC") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "NAME_DESC") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      sorted.sort((a, b) => {
        const dateA = a.createdAt;
        const dateB = b.createdAt;
        return dateB - dateA;
      });
    }
    return sorted;
  }, [companies, sortOption]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption, selectedFilters]);

  //page affiché à l'écran
  const currentData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return sortedData.slice(firstPageIndex, lastPageIndex);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className="flex flex-col items-center">
      <ListHero
        mainText="Liste des entreprises"
        subtitle="Découvrez les entreprises qui proposent des offres de stage ou d'alternance"
        breadcrumb={[{ name: 'Accueil', href: '/' }, { name: 'Entreprises', href: '/entreprises' }]}
      />
      <Container>
        <div className="w-64 space-y-10">
          <CompanyFilters
            setSelectedFilters={setSelectedFilters}
            selectedFilters={selectedFilters}
            tags={tags}
            categories={categories}
          />
        </div>
        <div className="w-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h2 className="text-[32px] leading-none font-semibold">Résultats</h2>
              <p className="text-darkGray font-normal">{companies.length} entreprises trouvées</p>
            </div>
            <div className="flex items-center font-normal space-x-1 relative">
              <label htmlFor="sort" className="text-[#7C8493]">Trier par :</label>
              <div className="flex items-center gap-1">
                <select
                  className="appearance-none pl-2 pr-5 focus:outline-none"
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="MOST_RECENT">Plus récent</option>
                  <option value="NAME_ASC">Nom A-Z</option>
                  <option value="NAME_DESC">Nom Z-A</option>
                </select>
                <IoIosArrowDown className="text-primary size-4 absolute right-0" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {currentData.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
          <div>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={companies.length}
              pageSize={pageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CompanyIndex;
