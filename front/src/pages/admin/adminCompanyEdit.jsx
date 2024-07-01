import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Combobox, Multiselect } from "react-widgets";
import Container from "../../layout/container.jsx";
import Input from "../../components/utils/input.jsx";
import {FaXmark} from "react-icons/fa6";

function AdminCompanyEdit() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [company, setCompany] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [base64Logo, setBase64Logo] = useState(null);
  const [bigLogo, setBigLogo] = useState(null);
  const [bigLogoPreview, setBigLogoPreview] = useState(null);
  const [base64BigLogo, setBase64BigLogo] = useState(null);

  const companyNameRef = useRef();
  const companySiretRef = useRef();
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
        companyAddressRef.current.value = data.address;
        companyAdditionalAddressRef.current.value = data.additionalAddress || '';
        companyPostalCodeRef.current.value = data.postalCode;
        companyCityRef.current.value = data.city;
        companyCountryRef.current.value = data.country;
        companyPhoneRef.current.value = data.phone;
        setSelectedTags(data.tags);
        setSelectedCategory(data.category);
        if (data.logo) {
          setLogo(`${import.meta.env.VITE_BACK_ENDPOINT}${data.logo}`)
          setLogoPreview(`${import.meta.env.VITE_BACK_ENDPOINT}${data.logo}`)
        }
        if (data.bigLogo) {
          setBigLogo(`${import.meta.env.VITE_BACK_ENDPOINT}${data.bigLogo}`)
          setBigLogoPreview(`${import.meta.env.VITE_BACK_ENDPOINT}${data.bigLogo}`)
        }
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    const getTags = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/tags`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTags(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    const getCategories = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/categories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getCompany();
    getTags();
    getCategories();
  }, [slug]);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64Logo(btoa(reader.result))
      reader.onloadend = () => {
        setLogo(file);
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogo(null);
      setLogoPreview(null);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
    setLogoPreview(null);
  };

  const handleBigLogoChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64BigLogo(btoa(reader.result))
      reader.onloadend = () => {
        setBigLogo(file);
        setBigLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setBigLogo(null);
      setBigLogoPreview(null);
    }
  };

  const handleRemoveBigLogo = () => {
    setBigLogo(null);
    setBigLogoPreview(null);
  };

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
    checkSiret();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const companyData = {
        name: companyNameRef.current?.value,
        siret: companySiretRef.current?.value,
        tags: selectedTags,
        category: selectedCategory,
        address: companyAddressRef.current?.value,
        additional_address: companyAdditionalAddressRef.current?.value,
        postal_code: companyPostalCodeRef.current?.value,
        city: companyCityRef.current?.value,
        country: companyCountryRef.current?.value,
        phone: companyPhoneRef.current?.value,
        logo: base64Logo,
        logo_name: logo?.name,
        bigLogo: base64BigLogo,
        bigLogo_name: bigLogo?.name,
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
    <Container className="flex-col gap-6">
      <h2 className="text-4xl">Fiche entreprise de {company.name}</h2>
      <span className="block w-full h-0.5 bg-grey/50"></span>
      <div className="space-y-6">
        <Input name="companyName" label="Nom" type="text" required={true} inputRef={companyNameRef} />
        <Input name="companySiret" label="Siret" type="text" onChange={checkSiret} required={true} inputRef={companySiretRef} />
        <p className="error">{errors?.companySiret}</p>
        <p className="error">{errors?.companySiretFormat}</p>
        <div className="space-y-2">
          <p>Secteurs d&apos;activité</p>
          {company.tags && tags && (
            <Multiselect name="companyTags" dataKey="id" textField="name" defaultValue={company.tags} data={tags} onChange={value => setSelectedTags(value)} />
          )}
        </div>
        <div className="space-y-2">
          <p>Catégorie</p>
          {company.category && categories && (
            <Combobox name="companyCategory" dataKey="id" textField="name" defaultValue={company.category} data={categories} onChange={value => setSelectedCategory(value)} />
          )}
        </div>
        <Input name="companyAddress" label="Adresse" type="text" required={true} inputRef={companyAddressRef} />
        <Input name="companyAdditionalAddress" label="Complément d'adresse" type="text" required={false} inputRef={companyAdditionalAddressRef} />
        <Input name="companyPostalCode" label="Code postal" type="number" max={5} required={true} inputRef={companyPostalCodeRef} />
        <Input name="companyCity" label="Ville" type="text" required={true} inputRef={companyCityRef} />
        <Input name="companyCountry" label="Pays" type="text" required={true} inputRef={companyCountryRef} />
        <Input name="companyPhone" label="Téléphone" type="tel" max={10} required={true} inputRef={companyPhoneRef} />
        <p className="text-xl">Logo</p>
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-2">
          <img src={logoPreview !== null ? `${logoPreview}` : '/placeholder.webp'} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
          {!logoPreview && (
            <div>
              <input
                className="hidden"
                id="file-input-logo"
                type="file"
                accept="image/png, image/jpeg"
                name="profilePic"
                onChange={handleLogoChange}
              />
              <label htmlFor="file-input-logo" className="bg-fourth/50 flex flex-col justify-center items-center text-center cursor-pointer px-10 border-2 border-primary border-dashed rounded text-primary">
                <p>Importer</p>
                <p className="text-grey">JPG ou PNG (5 Mo max)</p>
              </label>
            </div>
          )}
          {logoPreview && (
            <button onClick={handleRemoveLogo} className="flex items-center font-bold text-dark h-fit rounded bg-grey/50 cursor-pointer">
              <FaXmark className="w-7 h-7" />
            </button>
          )}
        </div>
        <p className="text-xl">Logo grand format</p>
        <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-2">
          <img src={bigLogoPreview !== null ? `${bigLogoPreview}` : '/placeholder.webp'} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
          {!bigLogoPreview && (
            <div>
              <input
                className="hidden"
                id="file-input-big_logo"
                type="file"
                accept="image/png, image/jpeg"
                name="profilePic"
                onChange={handleBigLogoChange}
              />
              <label htmlFor="file-input-big_logo" className="bg-fourth/50 flex flex-col justify-center items-center text-center cursor-pointer px-10 border-2 border-primary border-dashed rounded text-primary">
                <p>Importer</p>
                <p className="text-grey">JPG ou PNG (5 Mo max)</p>
              </label>
            </div>
          )}
          {bigLogoPreview && (
            <button onClick={handleRemoveBigLogo} className="flex items-center font-bold text-dark h-fit rounded bg-grey/50 cursor-pointer">
              <FaXmark className="w-7 h-7" />
            </button>
          )}
        </div>
        <button type="button" className="bg-primary w-full py-4 mt-12 text-white" onClick={handleSubmit}>Sauvegarder</button>
      </div>
    </Container>
  )
}

export default AdminCompanyEdit;
