import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Checkbox from "../components/utils/checkbox.jsx";
import SelectInput from "../components/utils/selectInput.jsx";
import Input from "../components/utils/input.jsx";
import {FaXmark} from "react-icons/fa6";
import Loader from "../components/utils/loader.jsx";
import {Combobox} from "react-widgets/cjs";
import Success from "../components/Success.jsx";

function Application() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();
  const [languagesList, setLanguagesList] = useState([]);
  const [picture, setPicture] = useState(null);
  const [base64Picture, setBase64Picture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [mainLanguage, setMainLanguage] = useState(null);
  const [profileEdited, setProfileEdited] = useState(false);
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const [level, setLevel] = useState('');
  const [criteria, setCriteria] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    number: false,
    passwordsMatch: false
  });

  const genderRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const birthDayRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const additionalAddressRef = useRef(null);
  const postalCodeRef = useRef(null);
  const cityRef = useRef(null);
  const personalWebsiteRef = useRef(null);
  const linkedinRef = useRef(null);
  const drivingLicenceRef = useRef(null);
  const disabilityRef = useRef(null);
  const schoolNameRef = useRef(null);
  const studiesName = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
      navigate(`/`);
    }

    const getLanguages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}languages`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLanguagesList(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error('Error fetching data: ', e);
      }
    }

    getLanguages();
  }, []);

  useEffect(() => {
    setLoading(true)

    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.student === null || user.student === undefined) {
        navigate(`/connexion`);
      }

      const getStudent = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/student`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStudent(data);

        const formattedBirthDate = data.user.birthDate.substring(0, 10);
        if (genderRef.current) genderRef.current.value = data.user.gender;
        if (firstNameRef.current) firstNameRef.current.value = data.user.firstName;
        if (lastNameRef.current) lastNameRef.current.value = data.user.lastName;
        if (birthDayRef.current) birthDayRef.current.value = formattedBirthDate;
        if (phoneNumberRef.current) phoneNumberRef.current.value = data.user.phone;
        if (emailRef.current) emailRef.current.value = data.user.email;
        if (addressRef.current) addressRef.current.value = data.address || '';
        if (additionalAddressRef.current) additionalAddressRef.current.value = data.additionalAddress || '';
        if (postalCodeRef.current) postalCodeRef.current.value = data.postalCode;
        if (cityRef.current) cityRef.current.value = data.city;
        if (personalWebsiteRef.current) personalWebsiteRef.current.value = data.personalWebsite ? data.personalWebsite : '';
        if (linkedinRef.current) linkedinRef.current.value = data.linkedinLink ? data.linkedinLink : '';
        if (disabilityRef.current) disabilityRef.current.value = data.disability ? data.disability : false;
        if (drivingLicenceRef.current) drivingLicenceRef.current.value = data.drivingLicence ? data.drivingLicence : false;
        if (data.user.pic) {
          setPicture(`${import.meta.env.VITE_BACK_ENDPOINT}${user.pic}`)
          setPreview(`${import.meta.env.VITE_BACK_ENDPOINT}${user.pic}`)
        }
        if (data.user.language) {
          setMainLanguage(data.user.language.code || 'fr');
        }
      }

      const getFormation = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/student/formation`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setLevel(data.level || '');
          if (schoolNameRef.current) schoolNameRef.current.value = data.schoolName || '';
          if (studiesName.current) studiesName.current.value = data.name || '';
        } catch (e) {
          console.error('Error fetching data: ', e);
        }
      }

      getStudent();
      getFormation();
    }
    setLoading(false);
  }, []);

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
  ]
  const studyLevels = [
    {
      code: 'CAP',
      value: 'CAP, BEP',
    },
    {
      code: 'BAC',
      value: 'Baccalauréat',
    },
    {
      code: 'BAC_2',
      value: 'BTS, DUT, BUT',
    },
    {
      code: 'BAC_3',
      value: 'Licence'
    },
    {
      code: 'BAC_5',
      value: 'Master, DEA, DESS',
    },
    {
      code: 'BAC_8',
      value: 'Doctorat'
    }
  ];
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64Picture(btoa(reader.result))
      reader.onloadend = () => {
        setPicture(file);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPicture(null);
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setPicture(null);
    setPreview(null);
  };

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
            throw new Error('L\'email est déjà utilisée');
          }
          return response.json();
        }).then(() => {
          setErrors({email: undefined})
          delete errors.email;
        })
        .catch(() => {
          setErrors({email: 'L\'adresse email est déjà utilisée'});
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

  const handleSubmit = () => {
    const newErrors = {};
    if ((passwordRef.current?.value && !confirmPasswordRef.current?.value) || 
      (!passwordRef.current?.value && confirmPasswordRef.current?.value)) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    if (passwordRef.current?.value && confirmPasswordRef.current?.value) {
      if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }
    setErrors(newErrors);
    if (Object.keys(errors).length === 0) {
      const data = {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        gender: genderRef.current?.value,
        email: emailRef.current?.value,
        phone: phoneNumberRef.current?.value,
        password: passwordRef.current?.value,
        confirm_password: confirmPasswordRef.current?.value,
        birthDate: birthDayRef.current?.value,
        language: mainLanguage ? mainLanguage.code : '',
        address: addressRef.current?.value,
        additional_address: additionalAddressRef.current?.value,
        postal_code: postalCodeRef.current?.value,
        city: cityRef.current?.value,
        student: {
          personal_website: personalWebsiteRef.current.value,
          linkedin_link: linkedinRef.current.value,
          driving_licence: drivingLicenceRef.current.checked,
          disability: disabilityRef.current.checked,
          pic: base64Picture,
          pic_name: picture ? picture.name : '',
          formation: {
            name: studiesName.current?.value,
            level: level ? level.code : '',
            school_name: schoolNameRef.current?.value,
          },
        },
      };
      fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/student/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(() => {
          setProfileEdited(true);
        })
        .catch(error => {
          setLoading(false);
          console.error('Error:', error);
        });
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    )
  }

  return (
    <div>
      {profileEdited && (
        <div>
          <Success desc="Vos modifications ont été sauvegardées" path="/" text="Retour à l'accueil" />
        </div>
      )}
      {!profileEdited && (
        <div>
          <div className="flex flex-col gap-6 px-24 pt-12 pb-20 bg-lightGrey">
            <form className="w-full flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0">
              <div className="space-y-6 w-full md:w-2/3">
                <h2 className="text-4xl">Mon profil</h2>
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between space-y-6 sm:space-y-0">
                    <SelectInput options={genders} name="gender" label="Genre" inputRef={genderRef} value={genderRef?.current?.value} />
                    <Input type="text" name="firstname" label="Prénom" inputRef={firstNameRef} />
                    <Input type="text" name="lastname" label="Nom" inputRef={lastNameRef} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input type="date" name="birthDay" label="Date de naissance" inputRef={birthDayRef} />
                    <Input type="tel" name="phone" label="Numéro de téléphone" max={10} inputRef={phoneNumberRef} />
                    <div>
                      <Input type="email" name="email" label="Email" onChange={checkEmail} inputRef={emailRef} />
                      <p className="text-red-700">{errors?.email}</p>
                    </div>
                    <Input type="text" name="address" label="Adresse" inputRef={addressRef} />
                    <Input type="text" name="additionalAddress" label="Complément d'adresse" inputRef={additionalAddressRef} />
                    <Input type="number" name="postalCode" label="Code postal" max={5} inputRef={postalCodeRef} />
                    <Input type="text" name="city" label="Ville" inputRef={cityRef} />
                    <div className="space-y-2">
                      <label>Langue</label>
                      <Combobox data={languagesList} dataKey='code' textField='name' defaultValue={mainLanguage ? mainLanguage : 'fr'} onChange={setMainLanguage} />
                    </div>
                    <div className="flex flex-col">
                      <Input
                        type="password"
                        name="password"
                        label="Mot de passe"
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
                        inputRef={confirmPasswordRef}
                        onChange={handleConfirmPasswordChange}
                        onBlur={() => setShowConfirmPasswordError(true)}
                      />
                      {showConfirmPasswordError && !criteria.passwordsMatch && (
                        <p className="text-red-700">Les mots de passe ne correspondent pas</p>
                      )}
                      <p className="text-red-700">{errors?.confirmPassword}</p>
                    </div>
                  </div>
                </div>
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-8 space-y-6 sm:space-y-0">
                    {level && (
                      <div className="space-y-2">
                        <label>Niveau d&apos;études</label>
                        <Combobox data={studyLevels} dataKey='code' textField='value' defaultValue={level} onChange={setLevel} />
                      </div>
                    )}
                    <Input inputRef={schoolNameRef} name="schoolName" label="Nom de l'établissement" type="text" />
                  </div>
                  <Input name="studiesName" label="Nom de la formation préparée" type="text" inputRef={studiesName} />
                  <Input type="url" name="personalWebsite" label="Adresse de votre site web personnel" inputRef={personalWebsiteRef} />
                  <Input type="url" name="linkedin" label="Lien vers votre page Linkedin" inputRef={linkedinRef} />
                  {student && (
                    <div className="flex space-x-8">
                      <Checkbox name="drivingLicence" label="J'ai le permis de conduire" inputRef={drivingLicenceRef} initialValue={student.drivingLicence} />
                      <Checkbox name="disability" label="J'ai une forme d'handicap" inputRef={disabilityRef} initialValue={student.disability} />
                    </div>
                  )}
                </div>
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <button type="button" className="bg-primary w-full py-4 text-white" onClick={handleSubmit}>Sauvegarder</button>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className="text-sm text-dark">En validant ce formulaire, vous confirmez que vous acceptez nos <a href="#" className="text-primary underline">Conditions Générales d'utilisation</a> et notre <a href="#" className="text-primary underline">politique de confidentialité</a></p>
              </div>
              <span className="block w-full h-0.5 bg-grey/50 md:hidden"></span>
              <div className="space-y-6 w-full md:w-1/3">
                <h4 className="text-primary text-2xl ">Votre photo</h4>
                <p>Ajouter votre photo à votre votre profil est apprécié par les entreprises et augmente vos chances</p>
                <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-2">
                  <img src={preview !== null ? `${preview}` : '/placeholder.webp'} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
                  {!preview && (
                    <div>
                      <input
                        className="hidden"
                        id="file-input"
                        type="file"
                        accept="image/png, image/jpeg"
                        name="profilePic"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-input" className="bg-fourth/50 flex flex-col justify-center items-center text-center cursor-pointer px-10 border-2 border-primary border-dashed rounded text-primary">
                        <p>Importer</p>
                        <p className="text-grey">JPG ou PNG (5 Mo max)</p>
                      </label>
                    </div>
                  )}
                  {preview && (
                    <button onClick={handleRemoveFile} className="flex items-center font-bold text-dark h-fit rounded bg-grey/50 cursor-pointer">
                      <FaXmark className="w-7 h-7" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Application;