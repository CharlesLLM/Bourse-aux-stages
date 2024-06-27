import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OfferCard from "../../components/utils/offerCard.jsx";
import Container from "../../layout/container.jsx";
import Input from "../../components/utils/input.jsx";

function AdminCompanyEdit() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [company, setCompany] = useState([]);
  const [errors, setErrors] = useState({});

  const companyNameRef = useRef();
  const companySiretRef = useRef();
  const companyTagsRef = useRef();
  const companyCategoryRef = useRef();
  const companyAddressRef = useRef();
  const companyAdditionalAddressRef = useRef();
  const companyPostalCodeRef = useRef();
  const companyCityRef = useRef();
  const companyCountryRef = useRef();
  const companyPhoneRef = useRef();

  useEffect(() => {
    const getCompany = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/company/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // If status error is 403, it means the user is not logged in or is not an admin of the company
        if (response.status === 403) {
          navigate(-1);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompany(data);

        companyNameRef.current.value = data.name;
        companySiretRef.current.value = data.siret;
        companyCategoryRef.current.value = data.category.name;
        companyAddressRef.current.value = data.address;
        companyAdditionalAddressRef.current.value = data.additional_address || '';
        companyPostalCodeRef.current.value = data.postal_code;
        companyCityRef.current.value = data.city;
        companyCountryRef.current.value = data.country;
        companyPhoneRef.current.value = data.phone;
        if (data.tags) {
          companyTagsRef.current.value = data.tags.map(tag => tag.name).join(', ');
        }
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getCompany();
  }, [slug]);

  function isEmpty(value) {
    return (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    );
  }

  function checkSiret() {
    if (companySiretRef.current?.value) {
      fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/company/check-siret/${companySiretRef.current?.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          setErrors({companySiret: undefined});
          delete errors.companySiret;
        })
        .catch(() => {
          setErrors({companySiret: 'Le siret est déjà utilisé'});
        });
    }
  }

  function validateSiret(siret) {
    let cleanedSiret = siret.replace(/\s+/g, '');

    if (cleanedSiret.length !== 14 || isNaN(cleanedSiret)) {
      setErrors({companySiret: 'Le SIRET doit contenir exactement 14 chiffres.'});
    }
    return cleanedSiret.replace(/(\d{3})(\d{3})(\d{2})(\d{6})/, '$1 $2 $3 $4');
  }

  const handleSubmit = () => {
    if (companySiretRef.current?.value && !validateSiret(companySiretRef.current?.value)) {
      errors.companySiretFormat = "Le format du siret n'est pas valide";
    }
    if (companyTagsRef.current?.value && companyTagsRef.current?.value.split(',').length > 5) {
      errors.companyTags = "Vous ne pouvez pas ajouter plus de 5 tags"
    }
    checkSiret();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const companyData = {
        name: !isEmpty(companyNameRef.current?.value) ? companyNameRef.current?.value : null,
        siret: !isEmpty(companySiretRef.current?.value) ? companySiretRef.current?.value : null,
        tags: !isEmpty(companyTagsRef.current?.value) ? companyTagsRef.current?.value.split(',') : null,
        category: !isEmpty(companyCategoryRef.current?.value) ? companyCategoryRef.current?.value : null,
        address: !isEmpty(companyAddressRef.current?.value) ? companyAddressRef.current?.value : null,
        additional_address: !isEmpty(companyAdditionalAddressRef.current?.value) ? companyAdditionalAddressRef.current?.value : null,
        postal_code: !isEmpty(companyPostalCodeRef.current?.value) ? companyPostalCodeRef.current?.value : null,
        city: !isEmpty(companyCityRef.current?.value) ? companyCityRef.current?.value : null,
        country: !isEmpty(companyCountryRef.current?.value) ? companyCountryRef.current?.value : null,
        phone: !isEmpty(companyPhoneRef.current?.value) ? companyPhoneRef.current?.value : null,
      };
      fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/company/edit/${slug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(companyData),
      })
        .then(response => response.json())
        .then(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Main content */}
      <Container className="flex-col gap-6">
        <h2 className="text-4xl">Fiche entreprise de {company.name}</h2>
        <span className="block w-full h-0.5 bg-grey/50"></span>
        <div className="space-y-6">
          <Input name="companyName" label="Nom" type="text" required={true} inputRef={companyNameRef} />
          <Input name="companySiret" label="Siret" type="text" onChange={checkSiret} required={true} inputRef={companySiretRef} />
          <p className="error">{errors?.companySiret}</p>
          <p className="error">{errors?.companySiretFormat}</p>
          <Input name="companyTags" label="Secteurs d'activité" type="text" required={false} inputRef={companyTagsRef} />
          <Input name="companyCategory" label="Catégorie" type="select" required={true} inputRef={companyCategoryRef} />
          <Input name="companyAddress" label="Adresse" type="text" required={true} inputRef={companyAddressRef} />
          <Input name="companyAdditionalAddress" label="Complément d'adresse" type="text" required={false} inputRef={companyAdditionalAddressRef} />
          <Input name="companyPostalCode" label="Code postal" type="number" max={5} required={true} inputRef={companyPostalCodeRef} />
          <Input name="companyCity" label="Ville" type="text" required={true} inputRef={companyCityRef} />
          <Input name="companyCountry" label="Pays" type="text" required={true} inputRef={companyCountryRef} />
          <Input name="companyPhone" label="Téléphone" type="tel" max={10} required={true} inputRef={companyPhoneRef} />
          <button type="button" className="bg-primary w-full py-4 mt-12 text-white" onClick={handleSubmit}>Sauvegarder</button>
        </div>
      </Container>

      {/* Offers section */}
      {company.offers && company.offers.length > 0 && (
        <div className="w-full bg-lightGrey px-32 py-[72px] space-y-7">
          <h2 className="text-3xl font-semibold">Offres de stages proposées</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {company.offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} displayPicture={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCompanyEdit;
