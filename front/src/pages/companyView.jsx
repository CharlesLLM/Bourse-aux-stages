import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/utils/breadcrumb.jsx';
import OfferCard from '../components/utils/offerCard.jsx';

function CompanyView() {
  const { slug } = useParams();
  const [company, setCompany] = useState([]);
  const [intershipOffers, setInternshipOffers] = useState([]);
  const [apprenticeshipOffers, setApprenticeshipOffers] = useState([]);

  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}company/${slug}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompany(data);

        setInternshipOffers(data.offers.filter((offer) => offer.type === 'stage'));
        setApprenticeshipOffers(data.offers.filter((offer) => offer.type === 'alternance'));
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getCompany();
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Header */}
      <div className="h-[300px] w-full bg-lightGrey px-32 flex flex-col pt-5 pb-10 gap-8">
        <Breadcrumb links={[
          { name: 'Accueil', href: '/' },
          { name: 'Entreprises', href: '/entreprises' },
          { name: company.name, href: `/entreprise/${slug}` },
        ]} />
        <div className="flex flex-col justify-center gap-6">
          <p className="text-5xl font-semibold">{company.name}</p>
          {company.websiteLink && company.websiteLinkLabel && (
            <a href={company.websiteLink} target="_blank" rel="noreferrer" className="bg-white text-primary px-3 py-1.5 w-fit flex gap-4 items-center">
              {company.websiteLinkLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-primary size-4">
                <path d="M12.1716 6.9999L6.8076 1.63589L8.2218 0.22168L16 7.9999L8.2218 15.778L6.8076 14.3638L12.1716 8.9999H0V6.9999H12.1716Z"/>
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex md:px-32 md:py-[72px] gap-16 w-full">
        {/* Left content */}
        <div className="flex flex-col gap-10 w-2/3">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Présentation</h2>
            <p className="text-textGrey font-bold">{company.summary}</p>
            <p className="font-normal">{company.description}</p>
          </div>
          {(company.linkedinLink || company.xLink) && (
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold">Réseaux sociaux</h2>
              <div className="flex gap-4">
                {company.linkedinLink && (
                  <a href={company.linkedinLink} target="_blank" rel="noreferrer" className="group border border-primary text-primary p-2 flex items-center gap-2.5 transition-colors duration-300 hover:bg-primary hover:text-white">
                    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="fill-primary transition-colors duration-300 group-hover:fill-white">
                      <path d="M18.4696 -0.00010431H1.52957C1.33915 -0.00274893 1.15007 0.0321432 0.973136 0.102579C0.796201 0.173016 0.634874 0.277616 0.498368 0.410408C0.361862 0.543199 0.252852 0.70158 0.177562 0.876505C0.102273 1.05143 0.0621787 1.23947 0.0595703 1.4299V18.5699C0.0621787 18.7603 0.102273 18.9484 0.177562 19.1233C0.252852 19.2982 0.361862 19.4566 0.498368 19.5894C0.634874 19.7222 0.796201 19.8268 0.973136 19.8972C1.15007 19.9676 1.33915 20.0025 1.52957 19.9999H18.4696C18.66 20.0025 18.8491 19.9676 19.026 19.8972C19.2029 19.8268 19.3643 19.7222 19.5008 19.5894C19.6373 19.4566 19.7463 19.2982 19.8216 19.1233C19.8969 18.9484 19.937 18.7603 19.9396 18.5699V1.4299C19.937 1.23947 19.8969 1.05143 19.8216 0.876505C19.7463 0.70158 19.6373 0.543199 19.5008 0.410408C19.3643 0.277616 19.2029 0.173016 19.026 0.102579C18.8491 0.0321432 18.66 -0.00274893 18.4696 -0.00010431ZM6.08957 16.7399H3.08957V7.7399H6.08957V16.7399ZM4.58957 6.4799C4.17583 6.4799 3.77904 6.31554 3.48648 6.02298C3.19393 5.73043 3.02957 5.33363 3.02957 4.9199C3.02957 4.50616 3.19393 4.10937 3.48648 3.81681C3.77904 3.52425 4.17583 3.3599 4.58957 3.3599C4.80927 3.33498 5.03175 3.35675 5.24245 3.42378C5.45314 3.49081 5.64731 3.60159 5.81223 3.74886C5.97715 3.89613 6.1091 4.07657 6.19944 4.27838C6.28979 4.48018 6.33649 4.69879 6.33649 4.9199C6.33649 5.141 6.28979 5.35961 6.19944 5.56141C6.1091 5.76322 5.97715 5.94366 5.81223 6.09093C5.64731 6.23821 5.45314 6.34898 5.24245 6.41601C5.03175 6.48304 4.80927 6.50481 4.58957 6.4799ZM16.9096 16.7399H13.9096V11.9099C13.9096 10.6999 13.4796 9.9099 12.3896 9.9099C12.0522 9.91237 11.7238 10.0182 11.4484 10.2131C11.1731 10.408 10.9641 10.6826 10.8496 10.9999C10.7713 11.2349 10.7374 11.4825 10.7496 11.7299V16.7299H7.74957C7.74957 16.7299 7.74957 8.5499 7.74957 7.7299H10.7496V8.9999C11.0221 8.527 11.4185 8.13741 11.896 7.8731C12.3735 7.60878 12.9141 7.47975 13.4596 7.4999C15.4596 7.4999 16.9096 8.7899 16.9096 11.5599V16.7399Z" />
                    </svg>
                    <p className="font-medium">linkedin.com</p>
                  </a>
                )}
                {company.xLink && (
                  <a href={company.xLink} target="_blank" rel="noreferrer" className="group border border-primary text-primary p-2 flex items-center gap-2.5 transition-colors duration-300 hover:bg-primary hover:text-white">
                    <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg" className="fill-primary transition-colors duration-300 group-hover:fill-white">
                      <path d="M20 2.79997C19.2483 3.12606 18.4534 3.34163 17.64 3.43997C18.4982 2.92729 19.1413 2.12075 19.45 1.16997C18.6436 1.65003 17.7608 1.98826 16.84 2.16997C16.2245 1.50254 15.405 1.05826 14.5098 0.906817C13.6147 0.755372 12.6945 0.905324 11.8938 1.33315C11.093 1.76099 10.4569 2.4425 10.0852 3.2708C9.71355 4.09911 9.62729 5.02736 9.84 5.90997C8.20943 5.82749 6.61444 5.40292 5.15865 4.66383C3.70287 3.92474 2.41885 2.88766 1.39 1.61997C1.02914 2.25013 0.839519 2.96379 0.84 3.68997C0.83872 4.36435 1.00422 5.02858 1.32176 5.62353C1.63929 6.21848 2.09902 6.72568 2.66 7.09997C2.00798 7.08222 1.36989 6.90726 0.8 6.58997V6.63997C0.804887 7.58486 1.13599 8.49906 1.73731 9.22793C2.33864 9.9568 3.17326 10.4556 4.1 10.64C3.74326 10.7485 3.37287 10.8058 3 10.81C2.74189 10.807 2.48442 10.7835 2.23 10.74C2.49391 11.5528 3.00462 12.2631 3.69107 12.7721C4.37753 13.2811 5.20558 13.5635 6.06 13.58C4.6172 14.7152 2.83588 15.3348 1 15.34C0.665735 15.3411 0.331736 15.321 0 15.28C1.87443 16.4902 4.05881 17.1327 6.29 17.13C7.82969 17.146 9.35714 16.855 10.7831 16.274C12.2091 15.6931 13.505 14.8338 14.5952 13.7465C15.6854 12.6591 16.548 11.3654 17.1326 9.94087C17.7172 8.51639 18.012 6.98969 18 5.44997C18 5.27996 18 5.09997 18 4.91997C18.7847 4.33478 19.4615 3.61739 20 2.79997Z"/>
                    </svg>
                    <p className="font-medium">twitter.com</p>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Images section */}
          {company.images && company.images.length > 0 && (
            <div className="flex gap-3">
              <div className="space-y-4">
                {company.images[0] && (
                  <img
                    key={company.images[0]}
                    src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${company.images[0]}`}
                    alt={company.name}
                    className="object-cover w-[460px] h-[400px]"
                  />
                )}
                {company.images[1] && (
                  <img
                    key={company.images[1]}
                    src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${company.images[1]}`}
                    alt={company.name}
                    className="object-cover w-[460px] h-[200px]"
                  />
                )}
              </div>
              <div className="space-y-2">
                {company.images.slice(2).map((image) => (
                  <img
                    key={image}
                    src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${image}`}
                    alt={company.name}
                    className="object-cover w-72 h-[200px]"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right content */}
        <div className="w-1/3 space-y-10">
          {company.logo && (
            <img
              src={`${import.meta.env.VITE_BACK_ENDPOINT}/uploads/company/${company.logo}`}
              alt={company.name}
              className="w-20 h-20 object-cover"
            />
          )}
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold">Situation</h2>
            <div>
              <p className="font-bold text-textGrey">{company.name}</p>
              <p className="font-normal text-textGrey">{company.address}</p>
              {company.additionalAddress && <p className="font-normal text-textGrey">{company.additionalAddress}</p>}
              <p className="font-normal text-textGrey">{company.postalCode} {company.city}</p>
            </div>
            <div>
              <a href="/" target="_blank" rel="noreferrer" className="bg-white text-primary font-semibold w-fit flex gap-4 items-center">
                Voir sur une carte
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-primary size-4">
                  <path d="M12.1716 6.9999L6.8076 1.63589L8.2218 0.22168L16 7.9999L8.2218 15.778L6.8076 14.3638L12.1716 8.9999H0V6.9999H12.1716Z"/>
                </svg>
              </a>
              {/* TODO: Add map */}
            </div>
            <hr className="w-96" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Nous joindre</h2>
            <div>
              {company.phone && <p className="font-normal text-textGrey">Téléphone : {company.phone}</p>}
              <p className="font-normal text-textGrey">Du lundi au vendredi de 8h30 à 18h30</p>
            </div>
            <div>
              <a href="/" target="_blank" rel="noreferrer" className="bg-white text-primary font-semibold w-fit flex gap-4 items-center">
                Nous envoyer un message
                <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="fill-primary size-4">
                  <path d="M12.1716 6.9999L6.8076 1.63589L8.2218 0.22168L16 7.9999L8.2218 15.778L6.8076 14.3638L12.1716 8.9999H0V6.9999H12.1716Z"/>
                </svg>
              </a>
            </div>
            <hr className="w-96" />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Vos contacts</h2>
            {company.admins && company.admins.length > 0 && company.admins.map((admin) => (
              <div key={`${company.id}-${admin.id}`} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <p className="font-bold text-textGrey">{admin.position}</p>
                    <p className="font-normal text-textGrey">{admin.user.firstName} <span className="uppercase">{admin.user.lastName}</span></p>
                  </div>
                  <div className="flex gap-5 items-center">
                    {admin.linkedinLink && (
                      <a href={admin.linkedinLink} target="_blank" rel="noreferrer">
                        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" className="fill-primary">
                          <path d="M18.4696 -0.00010431H1.52957C1.33915 -0.00274893 1.15007 0.0321432 0.973136 0.102579C0.796201 0.173016 0.634874 0.277616 0.498368 0.410408C0.361862 0.543199 0.252852 0.70158 0.177562 0.876505C0.102273 1.05143 0.0621787 1.23947 0.0595703 1.4299V18.5699C0.0621787 18.7603 0.102273 18.9484 0.177562 19.1233C0.252852 19.2982 0.361862 19.4566 0.498368 19.5894C0.634874 19.7222 0.796201 19.8268 0.973136 19.8972C1.15007 19.9676 1.33915 20.0025 1.52957 19.9999H18.4696C18.66 20.0025 18.8491 19.9676 19.026 19.8972C19.2029 19.8268 19.3643 19.7222 19.5008 19.5894C19.6373 19.4566 19.7463 19.2982 19.8216 19.1233C19.8969 18.9484 19.937 18.7603 19.9396 18.5699V1.4299C19.937 1.23947 19.8969 1.05143 19.8216 0.876505C19.7463 0.70158 19.6373 0.543199 19.5008 0.410408C19.3643 0.277616 19.2029 0.173016 19.026 0.102579C18.8491 0.0321432 18.66 -0.00274893 18.4696 -0.00010431ZM6.08957 16.7399H3.08957V7.7399H6.08957V16.7399ZM4.58957 6.4799C4.17583 6.4799 3.77904 6.31554 3.48648 6.02298C3.19393 5.73043 3.02957 5.33363 3.02957 4.9199C3.02957 4.50616 3.19393 4.10937 3.48648 3.81681C3.77904 3.52425 4.17583 3.3599 4.58957 3.3599C4.80927 3.33498 5.03175 3.35675 5.24245 3.42378C5.45314 3.49081 5.64731 3.60159 5.81223 3.74886C5.97715 3.89613 6.1091 4.07657 6.19944 4.27838C6.28979 4.48018 6.33649 4.69879 6.33649 4.9199C6.33649 5.141 6.28979 5.35961 6.19944 5.56141C6.1091 5.76322 5.97715 5.94366 5.81223 6.09093C5.64731 6.23821 5.45314 6.34898 5.24245 6.41601C5.03175 6.48304 4.80927 6.50481 4.58957 6.4799ZM16.9096 16.7399H13.9096V11.9099C13.9096 10.6999 13.4796 9.9099 12.3896 9.9099C12.0522 9.91237 11.7238 10.0182 11.4484 10.2131C11.1731 10.408 10.9641 10.6826 10.8496 10.9999C10.7713 11.2349 10.7374 11.4825 10.7496 11.7299V16.7299H7.74957C7.74957 16.7299 7.74957 8.5499 7.74957 7.7299H10.7496V8.9999C11.0221 8.527 11.4185 8.13741 11.896 7.8731C12.3735 7.60878 12.9141 7.47975 13.4596 7.4999C15.4596 7.4999 16.9096 8.7899 16.9096 11.5599V16.7399Z" />
                        </svg>
                      </a>
                    )}
                    {admin.email && (
                      <a href={`mailto:${admin.email}`} rel="noreferrer">
                        <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" className="stroke-primary stroke-2">
                          <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" strokeLinecap="round" strokeLinejoin="round"/>
                          <rect x="3" y="5" width="18" height="14" rx="2" strokeLinecap="round"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <hr className="w-96"/>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Offers section */}
      <div className="w-full bg-lightGrey px-32 py-[72px] flex flex-col justify-center gap-6">
        <div className="flex flex-col gap-12 w-full">
          <div className="space-y-7">
            <h2 className="text-3xl font-semibold">Offres de stages proposées</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {intershipOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
          <div className="space-y-7">
            <h2 className="text-3xl font-semibold">Offres en alternance proposées</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {apprenticeshipOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyView;
