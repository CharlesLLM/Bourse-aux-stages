import {useEffect, useRef, useState} from "react";
import Input from "../../components/utils/input.jsx";
import SelectInput from "../../components/utils/selectInput.jsx";
import Loader from "../../components/utils/loader.jsx";
import {Combobox} from "react-widgets/cjs";
import Success from "../../components/Success.jsx";

function AdminProfileEdit() {
  const [criteria, setCriteria] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    number: false,
    passwordsMatch: false
  });
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const genders = [
    {
      code: 'male',
      value: 'Homme',
    },
    {
      code: 'female',
      value: 'Femme',
    },
    {
      code: 'other',
      value: 'Autre'
    },
  ];

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const genderRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const birthDateRef = useRef();

  useEffect(() => {
    const getAdmin = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/check-admin`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (firstNameRef.current) firstNameRef.current.value = data.user.firstName;
        if (lastNameRef.current) lastNameRef.current.value = data.user.lastName;
        if (genderRef.current) genderRef.current.value = data.user.gender;
        if (emailRef.current) emailRef.current.value = data.user.email;
        if (phoneNumberRef.current) phoneNumberRef.current.value = data.user.phone;
        if (birthDateRef.current) birthDateRef.current.value = data.user.birthDate.split('T')[0];
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    getAdmin();
  }, []);

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
        setErrors({network: 'Une erreur est survenue lors du chargement'});
      });
  }, []);

  function checkEmail() {
    if (emailRef.current?.value) {
      fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/user/check-email/${emailRef.current?.value}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('L\'email est déjà utilisé');
          }
          return response.json();
        }).then(() => {
          setErrors({email: undefined})
          delete errors.email;
        })
        .catch(() => {
          setErrors({email: 'L\'adresse email est déjà utilisé'});
        });
    }
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
  }

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.code);
  };

  const handleSubmit = () => {
    const newErrors = {};
    if ((passwordRef.current?.value && !confirmPasswordRef.current?.value) || (!passwordRef.current?.value && confirmPasswordRef.current?.value)) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (passwordRef.current?.value && confirmPasswordRef.current?.value) {
      if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }
    checkEmail();
    setErrors(newErrors);
    // if (Object.keys(errors).length === 0 && criteria.passwordsMatch) {
    if (Object.keys(errors).length === 0) {
      const userData = {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        gender: genderRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneNumberRef.current?.value,
        password: passwordRef.current?.value,
        confirm_password: confirmPasswordRef.current?.value,
        birth_date: birthDateRef.current?.value,
        language: selectedLanguage,
      };
      fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/user/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userData),
      })
        .then(response => response.json())
        .then(() => {
          setUserCreated(true);
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

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      {userCreated && (
        <div>
          <Success desc="Vos modifications ont été sauvegardées" path="/admin" text="Retour au tableau de bord"/>
        </div>
      )}
      {!userCreated && (
        <div className="px-12 py-20">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Input name="firstName" label="Prénom" type="text" required={true} inputRef={firstNameRef} />
              <p className="text-red-700">{errors?.firstName}</p>
            </div>
            <div>
              <Input name="name" label="Nom" type="text" required={true} inputRef={lastNameRef} />
              <p className="text-red-700">{errors?.name}</p>
            </div>
            <div>
              <SelectInput options={genders} name="gender" label="Genre" required={true} inputRef={genderRef} />
              <p className="text-red-700">{errors?.gender}</p>
            </div>
            <div>
              <Input name="mail" label="Email" type="email" onBlur={checkEmail} required={true} inputRef={emailRef} />
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
          <button type="button" className="bg-primary w-full py-4 mt-12 text-white" onClick={handleSubmit}>Sauvegarder</button>
        </div>
      )}
    </div>
  );
}

export default AdminProfileEdit;
