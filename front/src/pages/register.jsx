import React, {createContext, useEffect, useRef, useState} from "react";
import Input from "../components/utils/input.jsx";
import SelectInput from "../components/utils/selectInput.jsx";
import Radio from "../components/utils/radio.jsx";
import Loader from "../components/utils/loader.jsx";
import {Combobox} from "react-widgets/cjs";

function Register() {
  const [criteria, setCriteria] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    number: false,
    passwordsMatch: false
  });
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setError] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const [role, setRole] = useState('');

  const genders = ['Homme', 'Femme', 'Autre'];
  const firstnameRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const birthDateRef = useRef();
  const studentRoleRef = useRef();
  const adminRoleRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const postalCodeRef = useRef();
  const addressRef = useRef();
  const companyNameRef = useRef();
  const companyAddressRef = useRef();
  const companyCityRef = useRef();
  const companyPhoneRef = useRef();
  const companySiretRef = useRef();
  const companyPostalCodeRef = useRef();
  const companySecondAddressRef = useRef();
  const companyPositionRef = useRef();
  const companyCountryRef = useRef();


  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACK_ENDPOINT}languages`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLanguages(data);
        setSelectedLanguage('fr');
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error(error)
        setError({network: 'Une erreur est survenue lors du chargement'});
      });
  }, []);

  function validateSiret(siret) {
    if (siret.length !== 14 || !/^\d+$/.test(siret)) {
      return false;
    }

    function luhnChecksum(num) {
      let total = 0;
      let reverseDigits = num.split('').reverse().map(Number);
      for (let i = 0; i < reverseDigits.length; i++) {
        let digit = reverseDigits[i];
        if (i % 2 === 1) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        total += digit;
      }
      return total % 10 === 0;
    }

    const siren = siret.slice(0, 9);
    if (!luhnChecksum(siren)) {
      return false;
    }

    return luhnChecksum(siret);
  }

  const validatePassword = (password) => {
    const lengthValid = password.length >= 8;
    const specialCharValid = /[!@#$%^&*(),.?":{}|/<>]/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    const numberValid = /\d/.test(password);

    setCriteria({
      length: lengthValid,
      specialChar: specialCharValid,
      uppercase: uppercaseValid,
      number: numberValid,
    });
  };

  const handlePasswordChange = () => {
    const password = passwordRef.current?.value;
    validatePassword(password);
  };

  const handleConfirmPasswordChange = () => {
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    const passwordsMatch = password === confirmPassword;
    setCriteria({
      ...criteria,
      passwordsMatch: passwordsMatch
    });
    console.log(criteria.passwordsMatch)
  }

  const handleRoleChange = (role) => {
    setRole(role);
  }
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.code);
  };

  const handleSubmit = () => {
    const errors = {};
    if (!firstnameRef.current?.value) {
      errors.firstname = "Le prénom est requis";
    }
    if (!nameRef.current?.value) {
      errors.name = "Le nom est requis";
    }
    if (!genderRef.current?.value) {
      errors.gender = "Le genre est requis";
    }
    if (!emailRef.current?.value) {
      errors.email = "L'email est requis";
    }
    if (!phoneNumberRef.current?.value) {
      errors.phone = "Le numéro de téléphone est requis";
    }
    if (!passwordRef.current?.value) {
      errors.password = "Choisissez votre mot de passe";
    }
    if (!confirmPasswordRef.current?.value) {
      errors.confirmPassword = "Confirmez le mot de passe";
    }
    if (!birthDateRef.current?.value) {
      errors.birthDay = "Le date de naissance est requise";
    }
    if (role === 'admin') {
      if (!companyNameRef.current?.value) {
        errors.companyName = "Le nom de l'entreprise est requis";
      }
      if (!companyPositionRef.current?.value) {
        errors.companyPosition = "Le poste dans l'entreprise est requis";
      }
      if (!companySiretRef.current?.value) {
        errors.companySiret = "Le siret de l'entreprise est requis";
      }
      if (companySiretRef.current?.value && !validateSiret(companySiretRef.current?.value)) {
        errors.companySiretFormat = "Le format du siret n'est pas valide";
      }
      if (!companyAddressRef.current?.value){
        errors.companyAddress = "L'adresse de l'entreprise est requise"
      }
      if (!companyCityRef.current?.value){
        errors.companyCity = "La ville de l'entreprise est requise"
      }
      if (!companyPostalCodeRef.current?.value){
        errors.companyPostalCode = "Le code postal de l'entreprise est requis"
      }
      if (!companyPhoneRef.current?.value){
        errors.companyPhone = "Le téléphone de l'entreprise est requis"
      }
      if (!companyCountryRef.current?.value){
        errors.companyCountry = "Le pays de l'entreprise est requis"
      }
    }
    if (role === 'student') {
      if (!cityRef.current?.value) {
        errors.city = "La ville est requise";
      }
      if (!countryRef.current?.value) {
        errors.country = "Le pays est requis";
      }
      if (!postalCodeRef.current?.value) {
        errors.postalCode = "Le code postal est requis";
      }
      if (!addressRef.current?.value) {
        errors.address = "L'adresse est requise'";
      }
    }
    setError(errors);
    if (Object.keys(errors).length === 0 && criteria.passwordsMatch) {
      const userData = {
        firstname: firstnameRef.current?.value,
        name: nameRef.current?.value,
        gender: genderRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneNumberRef.current?.value,
        password: passwordRef.current?.value,
        confirm_password: confirmPasswordRef.current?.value,
        birth_date: birthDateRef.current?.value,
        role: role,
        language: selectedLanguage,
        student : {
          address: addressRef.current?.value,
          city: cityRef.current?.value,
          country: countryRef.current?.value,
          postal_code: postalCodeRef.current?.value,
        },
        admin : {
          company_position: companyPositionRef.current?.value,
          company: {
            address: companyAddressRef.current?.value,
            city: companyCityRef.current?.value,
            country: companyCountryRef.current?.value,
            postal_code: companyPostalCodeRef.current?.value,
            second_address: companySecondAddressRef.current?.value,
            name: companyNameRef.current?.value,
            siret: companySiretRef.current?.value,
            phone: companyPhoneRef.current?.value,
          }
        }
      };
      fetch(`${import.meta.env.VITE_BACK_ENDPOINT}user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="px-12 py-20">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Input name="firstname" label="Prénom" type="text" required={true} inputRef={firstnameRef} />
          <p className="text-red-700">{errors?.firstname}</p>
        </div>
        <div>
          <Input name="name" label="Nom" type="text" required={true} inputRef={nameRef} />
          <p className="text-red-700">{errors?.name}</p>
        </div>
        <div>
          <SelectInput options={genders} name="gender" label="Genre" required={true} inputRef={genderRef} />
          <p className="text-red-700">{errors?.gender}</p>
        </div>
        <div>
          <Input name="mail" label="Email" type="email" required={true} inputRef={emailRef} />
          <p className="text-red-700">{errors?.email}</p>
        </div>
        <div>
          <Input name="birthDate" label="Date de naissance" type="date" required={true} inputRef={birthDateRef} />
          <p className="text-red-700">{errors?.birthDay}</p>
        </div>
        <div>
          <Input type="tel" name="phone" label="Numéro de téléphone" max={10} required={true} inputRef={phoneNumberRef} />
          <p className="text-red-700">{errors?.phone}</p>
        </div>
        <div className="flex flex-col">
          <Input
            type="password"
            name="password"
            label="Mot de passe"
            required={true}
            onChange={handlePasswordChange}
            onFocus={() => setShowPasswordCriteria(true)}
            inputRef={passwordRef}
          />
          {showPasswordCriteria && (
            <div className="grid grid-cols-2 gap-4">
              <ul>
                <li className={criteria.length ? 'text-green-600' : 'text-red-700'}>8 caractères (minimum)</li>
                <li className={criteria.specialChar ? 'text-green-600' : 'text-red-700'}>Caractères spécial</li>
                <li className={criteria.uppercase ? 'text-green-600' : 'text-red-700'}>Majuscule</li>
                <li className={criteria.number ? 'text-green-600' : 'text-red-700'}>Chiffre</li>
              </ul>
              <p className="text-red-700">{errors?.password}</p>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <Input
            type="password"
            name="confirmPassword"
            label="Confirmez le mot de passe"
            required={true}
            inputRef={confirmPasswordRef}
            onChange={handleConfirmPasswordChange}
            onBlur={() => setShowConfirmPasswordError(true)}
          />
          {showConfirmPasswordError && !criteria.passwordsMatch && (
            <p className="text-red-700">Les mots de passe ne correspondent pas</p>
          )}
          <p className="text-red-700">{errors?.confirmPassword}</p>
        </div>
        <div className="space-y-2">
          <label>Langue</label>
          <Combobox data={languages} dataKey='code' textField='name' defaultValue='fr' onChange={handleLanguageChange} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-start mt-6 space-x-12">
        <Radio name="loginRole" label="Je m'inscris en tant qu'étudiant" inputRef={studentRoleRef} onChange={() => handleRoleChange('student')} />
        <Radio name="loginRole" label="Je m'inscris en tant qu'organisation" inputRef={adminRoleRef} onChange={() => handleRoleChange('admin')} />
      </div>
      {role === 'student' && (
        <div className="mt-6 space-y-6">
          <Input name="address" label="Adresse postale" type="text" required={true} inputRef={addressRef} />
          <p className="text-red-700">{errors?.address}</p>
          <Input name="city" label="Ville" type="text" required={true} inputRef={cityRef} />
          <p className="text-red-700">{errors?.city}</p>
          <Input name="country" label="Pays" type="text" required={true} inputRef={countryRef} />
          <p className="text-red-700">{errors?.country}</p>
          <Input name="postalCode" label="Code Postal" type="number" max={5} required={true} inputRef={postalCodeRef} />
          <p className="text-red-700">{errors?.postalCode}</p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <button type="button" className="bg-primary w-full py-4 mt-12 text-white" onClick={handleSubmit}>S'inscrire</button>
        </div>
      )}
      {role === 'admin' && (
        <div className="mt-6 space-y-6">
          <Input name="companyName" label="Nom de l'entreprise" type="text" required={true} inputRef={companyNameRef} />
          <p className="text-red-700">{errors?.companyName}</p>
          <Input name="companyPosition" label="Position dans l'entreprise" type="text" required={true} inputRef={companyPositionRef} />
          <p className="text-red-700">{errors?.companyPosition}</p>
          <Input name="companySiret" label="Siret de l'entreprise" type="text" required={true} inputRef={companySiretRef} />
          <p className="text-red-700">{errors?.companySiret}</p>
          <p className="text-red-700">{errors?.companySiretFormat}</p>
          <Input name="companyAddress" label="Adresse de l'entreprise" type="text" required={true} inputRef={companyAddressRef} />
          <p className="text-red-700">{errors?.companyAddress}</p>
          <Input name="companySecondAddress" label="Complément d'adresse" type="text" required={false} inputRef={companySecondAddressRef} />
          <Input name="companyPostalCode" label="Code postal" type="number" max={5} required={true} inputRef={companyPostalCodeRef} />
          <p className="text-red-700">{errors?.companyPostalCode}</p>
          <Input name="companyCity" label="Ville" type="text" required={true} inputRef={companyCityRef} />
          <p className="text-red-700">{errors?.companyCity}</p>
          <Input name="companyCountry" label="Pays" type="text" required={true} inputRef={companyCountryRef} />
          <p className="text-red-700">{errors?.companyCountry}</p>
          <Input name="companyPhone" label="Téléphone" type="tel" max={10} required={true} inputRef={companyPhoneRef} />
          <p className="text-red-700">{errors?.companyPhone}</p>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <button type="button" className="bg-primary w-full py-4 mt-12 text-white" onClick={handleSubmit}>S'inscrire</button>
        </div>

      )}
    </div>
  );
}

export default Register;
