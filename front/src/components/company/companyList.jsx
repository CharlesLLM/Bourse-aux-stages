import CompanyCard from "./companyCard";
import PropTypes from 'prop-types';

function CompanyList({ companies }) {
  return (
    <>
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
    </>
  );
}

CompanyList.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default CompanyList;
