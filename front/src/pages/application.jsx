import {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import Checkbox from "../components/utils/checkbox.jsx";
import OfferHeader from "../components/utils/offerHeader.jsx";
import SelectInput from "../components/utils/selectInput.jsx";
import Input from "../components/utils/input.jsx";
import RichText from "../components/utils/richText.jsx";
import {FaXmark} from "react-icons/fa6";
import {FaPlus} from "react-icons/fa";
import SkillModal from "../components/utils/modals/skillModal.jsx";
import {v4 as uuidv4} from "uuid";
import {IoIosLink, IoMdArrowBack} from "react-icons/io";
import Loader from "../components/utils/loader.jsx";
import {Combobox} from "react-widgets/cjs";
import Success from "../components/Success.jsx";

function Application() {
  const [user, setUser] = useState(null);
  const {id} = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState({});
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [picture, setPicture] = useState(null);
  const [CV, setCV] = useState(null);
  const [letter, setLetter] = useState(null);
  const [otherFile, setOtherFile] = useState(null);
  const [base64CV, setBase64CV] = useState(null);
  const [base64Picture, setBase64Picture] = useState(null);
  const [base64Letter, setBase64Letter] = useState(null);
  const [base64Other, setBase64Other] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState({});
  const [errorModal, setErrorModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(null);
  const [motivation, setMotivation] = useState(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const genderRef = useRef(null);
  const firstnameRef = useRef(null);
  const nameRef = useRef(null);
  const birthDayRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const confirmEmailRef = useRef(null);
  const addressRef = useRef(null);
  const additionalAddressRef = useRef(null);
  const postalCodeRef = useRef(null);
  const cityRef = useRef(null);
  const personalWebsiteRef = useRef(null);
  const linkedinRef = useRef(null);
  const drivingLicenceRef = useRef(null);
  const disabilityRef = useRef(null);
  const studyLevelRef = useRef(null);
  const schoolNameRef = useRef(null);
  const studiesName = useRef(null);
  const skillRef = useRef(null);
  const languageLevelRef = useRef(null);
  const experienceCompanyRef = useRef(null);
  const experiencePositionRef = useRef(null);
  const experienceDescriptionRef = useRef(null);
  const experienceStartDateRef = useRef(null);
  const experienceEndDateRef = useRef(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')))
    if (!localStorage.getItem('token') || !localStorage.getItem('user')) {
      navigate(`/offre/${id}`);
    }

    const getOffer = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}offer/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOffer(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    const getLanguage = async () => {
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

    getOffer();
    getLanguage();
  }, [id]);

  useEffect(() => {
    setLoading(true)

    if (user) {
      if (user.student === null || user.student === undefined) {
        navigate(`/connexion`);
      }

      const getApplication = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}application/get/${user.student.id}/${id}`);
        if (response.ok) {
          navigate(`/offre/${id}`);
        }
      }
      getApplication();

      const formattedBirthDate = user.birthDate.substring(0, 10);
      if (genderRef.current) genderRef.current.value = user.gender;
      if (firstnameRef.current) firstnameRef.current.value = user.firstName;
      if (nameRef.current) nameRef.current.value = user.lastName;
      if (birthDayRef.current) birthDayRef.current.value = formattedBirthDate;
      if (phoneNumberRef.current) phoneNumberRef.current.value = user.phone;
      if (emailRef.current) emailRef.current.value = user.email;
      if (confirmEmailRef.current) confirmEmailRef.current.value = user.email;
      if (addressRef.current) addressRef.current.value = user.address;
      if (additionalAddressRef.current) additionalAddressRef.current.value = user.secondAddress ? user.secondAddress : '';
      if (postalCodeRef.current) postalCodeRef.current.value = user.student.postalCode;
      if (cityRef.current) cityRef.current.value = user.student.city;
      if (personalWebsiteRef.current) personalWebsiteRef.current.value = user.student.personalWebsite ? user.student.personalWebsite : '';
      if (linkedinRef.current) linkedinRef.current.value = user.student.linkedinLink ? user.student.linkedinLink : '';
      if (disabilityRef.current) disabilityRef.current.value = user.student.disability ? user.student.disability : false;
      if (drivingLicenceRef.current) drivingLicenceRef.current.value = user.student.drivingLicence ? user.student.drivingLicence : false;
      if (user.pic) {
        setPicture(`${import.meta.env.VITE_BACK_ENDPOINT}${user.pic}`)
        setPreview(`${import.meta.env.VITE_BACK_ENDPOINT}${user.pic}`)
      }
    }
    setLoading(false);
  }, [user]);

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
  ]
  const languageLevels = [
    {
      level: "A1",
      description: "Notions"
    },
    {
      level: "A2",
      description: "Élémentaire"
    },
    {
      level: "B1",
      description: "Intermédiaire"
    },
    {
      level: "B2",
      description: "Intermédiaire avancé"
    },
    {
      level: "C1",
      description: "Avancé"
    },
    {
      level: "C2",
      description: "Maîtrise"
    }
  ];

  const handleAddSkill = () => {
    setErrorModal("");
    const newSkillName = skillRef.current.value;
    if (newSkillName.length > 0) {
      const newSkill = {id: uuidv4(), name: newSkillName};
      setSkills([...skills, newSkill]);
      setIsSkillModalOpen(false);
      skillRef.current.value = "";
    } else {
      setErrorModal("Veuillez remplir tous les champs");
    }
  };

  const handleLanguageChange = (event) => {
    setLanguage({code: event.code, name: event.name})
  };

  const handleAddLanguage = () => {
    setErrorModal("");
    const newLangCode = language.code;
    const newLangName = language.name
    const newLangLevel = languageLevelRef.current.value;
    if (newLangName.length > 0) {
      const newLang = {code: newLangCode, name: newLangName, level: newLangLevel};
      setLanguages([...languages, newLang]);
      setIsLanguageModalOpen(false);
      setLanguage(null);
    } else {
      setErrorModal("Veuillez remplir tous les champs");
    }
  };

  const handleAddExperience = () => {
    setErrorModal("");
    const newCompanyName = experienceCompanyRef.current.value;
    const newPosition = experiencePositionRef.current.value;
    const newDescription = experienceDescriptionRef.current.value;
    const newStartDate = experienceStartDateRef.current.value;
    const newEndDate = experienceEndDateRef.current.value;
    if (new Date(newEndDate) < new Date(newStartDate)) {
      setErrorModal("La date de fin ne peut pas être antérieure à la date de début.");
      return;
    }

    if (newCompanyName.length > 0 && newPosition.length > 0 && newDescription.length > 0 && newStartDate.length > 0 && newEndDate.length > 0) {
      const newExperience = {
        id: uuidv4(),
        company: newCompanyName,
        position: newPosition,
        description: newDescription,
        startDate: newStartDate,
        endDate: newEndDate
      };
      setExperiences([...experiences, newExperience]);
      setIsExperienceModalOpen(false);
      experienceCompanyRef.current.value = "";
      experiencePositionRef.current.value = "";
      experienceDescriptionRef.current.value = "";
      experienceStartDateRef.current.value = "";
      experienceEndDateRef.current.value = "";
    } else {
      setErrorModal("Veuillez remplir tous les champs");
    }
  };

  const handleRemoveSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleRemoveLanguage = (code) => {
    setLanguages(languages.filter(language => language.code !== code));
  };

  const handleRemoveExperience = (id) => {
    setExperiences(experiences.filter(experience => experience.id !== id));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddSkill();
    }
  };

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

  const handleCVUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64CV(btoa(reader.result))
      reader.onloadend = () => {
        setCV(file);
      };
      reader.readAsDataURL(file);
    } else {
      setCV(null);
    }
  }

  const handleLetterUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64Letter(btoa(reader.result))
      reader.onloadend = () => {
        setLetter(file);
      };
      reader.readAsDataURL(file);
    } else {
      setLetter(null);
    }
  }

  const handleOtherUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBase64Other(btoa(reader.result))
      reader.onloadend = () => {
        setOtherFile(file);
      };
      reader.readAsDataURL(file);
    } else {
      setOtherFile(null);
    }
  }

  const handleRemoveFile = () => {
    setPicture(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    const errors = {};
    if (!CV) {
      errors.cv = 'Veuillez ajouter un CV';
    }
    if (!letter) {
      errors.letter = 'Veuillez ajouter une lettre de motivation';
    }
    if (languages.length <= 0) {
      errors.language = 'Veuillez ajouter au moins une langue'
    }
    if (skills.length <= 0) {
      errors.skills = 'Veuillez ajouter au moins une compétence'
    }
    setError(errors);
    if (Object.keys(errors).length === 0) {
      const application = {
        student: {
          personal_website: personalWebsiteRef.current.value,
          linkedin: linkedinRef.current.value,
          driving_licence: drivingLicenceRef.current.checked,
          disability: disabilityRef.current.checked,
          letter: base64Letter,
          letter_name: letter.name,
          cv: base64CV,
          cv_name: CV.name,
          pic: base64Picture,
          pic_name: picture.name
        },
        application: {
          ...(otherFile && {
            other_document: base64Other,
            other_document_name: otherFile.name,
          }),
          study_level: studyLevelRef.current.value,
          school_name: schoolNameRef.current.value,
          studies_name: studiesName.current.value,
          motivation_letter: motivation,
        },
        skills: skills.map(skill => skill.name),
        offer_id: id,
        languages: languages,
        experiences: experiences.map(experience => ({
          company: experience.company,
          position: experience.position,
          description: experience.description,
          start_date: experience.startDate,
          end_date: experience.endDate,
        })),
      };
      fetch(`${import.meta.env.VITE_BACK_ENDPOINT}api/application/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(application),
      })
        .then(response => response.json())
        .then(() => {
          setApplicationSubmitted(true);
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
      {applicationSubmitted && (
        <Success desc="La candidature a été envoyé avec succès" path={`/offre/${id}`} text="Retour à l'offre"/>
      )}
      {!applicationSubmitted && (
        <div>
          {offer.id && (
            <OfferHeader offer={offer} />
          )}
          <div className="flex flex-col gap-6 px-24 pt-12 pb-20">
            <form className="w-full flex flex-col md:flex-row md:space-x-16 space-y-6 md:space-y-0">
              <div className="space-y-6 w-full md:w-2/3">
                <h2 className="text-4xl">Postulez à cette offre de stage</h2>
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <div className="space-y-6 ">
                  <h3 className="text-2xl">Vous êtes</h3>
                  <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between space-y-6 sm:space-y-0">
                    <SelectInput options={genders} name="gender" label="Genre" required={true} inputRef={genderRef} value={genderRef?.current?.value} disabled={true} />
                    <Input type="text" name="firstname" label="Prénom" required={true} inputRef={firstnameRef} disabled={true} />
                    <Input type="text" name="lastname" label="Nom" required={true} inputRef={nameRef} disabled={true} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input type="date" name="birthDay" label="Date de naissance" required={true} inputRef={birthDayRef} disabled={true} />
                    <Input type="tel" name="phone" label="Numéro de téléphone" max={10} required={true} inputRef={phoneNumberRef} disabled={true} />
                    <Input type="email" name="email" label="Email" required={true} inputRef={emailRef} disabled={true} />
                    <Input type="email" name="emailConfirm" label="Confirmer votre email" required={true} inputRef={confirmEmailRef} disabled={true} />
                    <Input type="text" name="address" label="Adresse" required={false} inputRef={addressRef} disabled={true} />
                    <Input type="text" name="additionalAddress" label="Complement d'adresse" required={false} inputRef={additionalAddressRef} disabled={true} />
                    <Input type="number" name="postalCode" label="Code postal" max={5} required={false} inputRef={postalCodeRef} disabled={true} />
                    <Input type="text" name="city" label="Ville" required={false} inputRef={cityRef} disabled={true} />
                  </div>
                  <Input type="url" name="personalWebsite" required={false} label="Adresse de votre site web personnel" inputRef={personalWebsiteRef} />
                  <Input type="url" name="linkedin" required={false} label="Lien vers votre page Linkedin" inputRef={linkedinRef} />
                  <div className="flex space-x-8">
                    <Checkbox name="drivingLicence" label="J'ai le permis de conduire" inputRef={drivingLicenceRef} initialValue={drivingLicenceRef ? drivingLicenceRef : false}/>
                    <Checkbox name="disability" label="J'ai une forme d'handicap" inputRef={disabilityRef} initialValue={disabilityRef ? disabilityRef : false}/>
                  </div>
                </div>
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <div className="space-y-6">
                  <h3 className="text-2xl">Votre situation actuelle</h3>
                  <div className="grid grid-cols-2 gap-8 space-y-6 sm:space-y-0">
                    <SelectInput inputRef={studyLevelRef} name="studyLevel" required={true} label="Niveau d'études" options={studyLevels} />
                    <Input inputRef={schoolNameRef} name="schoolName" label="Nom de l'établissement" type="text" required={true} />
                  </div>
                  <Input name="studiesName" label="Nom de la formation préparée" type="text" required={true} inputRef={studiesName} />
                  <RichText label="Vos atouts & motivations pour postuler à cette offre de stage" setMotivation={setMotivation} />
                </div>
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <button type="button" className="bg-primary w-full py-4 text-white" onClick={handleSubmit}>Postuler à cette offre de stage</button>
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
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <div>
                  <h4 className="text-primary text-2xl ">Vos compétences</h4>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <p>Ajoutez jusqu'à 10 compétences :</p>
                  <div className="w-full flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center p-1 w-fit bg-primary text-white">
                        <p>{skill.name}</p>
                        <button
                          onClick={() => handleRemoveSkill(skill.id)}
                          className="ml-2"
                        >
                          <FaXmark />
                        </button>
                      </div>
                    ))}
                  </div>
                  {skills.length < 10 && (
                    <button
                      type="button"
                      onClick={() => setIsSkillModalOpen(true)}
                      className="text-primary bg-fourth/50 flex items-center gap-2 px-2 py-1 mt-2"
                    >
                      Ajouter <FaPlus className="text-xs" />
                    </button>
                  )}
                  {isSkillModalOpen && (
                    <SkillModal closeModal={() => setIsSkillModalOpen(false)}>
                      <h2>Ajouter une compétence</h2>
                      <input
                        type="text"
                        placeholder="Nom de la compétence"
                        className="border border-gray-400 p-2 my-4 rounded mt-2"
                        ref={skillRef}
                        onKeyDown={handleKeyDown}
                      />
                      <p className="text-red-700">{errorModal ? errorModal : ''}</p>
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="ml-2 bg-primary text-white font-bold py-2 px-4 mt-2"
                      >
                        Ajouter
                      </button>
                    </SkillModal>
                  )}
                  <p className="text-red-700">{error?.skills}</p>
                </div>
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <div>
                  <h4 className="text-primary text-2xl ">Vos pratiques des langues</h4>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <p>Ajoutez les langues que vous pratiquez :</p>
                  <div className="w-full flex flex-wrap gap-3">
                    {languages.map((language) => (
                      <div key={language.code} className="flex items-center p-1 w-fit bg-primary text-white">
                        <p>{language.name} : {language.level}</p>
                        <button
                          onClick={() => handleRemoveLanguage(language.code)}
                          className="ml-2"
                        >
                          <FaXmark />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsLanguageModalOpen(true)}
                    className="text-primary bg-fourth/50 flex items-center gap-2 px-2 py-1 mt-2"
                  >
                    Ajouter <FaPlus className="text-xs" />
                  </button>
                  {isLanguageModalOpen && (
                    <SkillModal closeModal={() => setIsLanguageModalOpen(false)}>
                      <h2 className="mb-4">Ajouter une Langue</h2>
                      <div className="flex space-x-6">
                        <Combobox data={languagesList} dataKey='code' textField='name' onChange={handleLanguageChange} />
                        <select ref={languageLevelRef}>
                          <option value="" disabled>Veuillez choisir</option>
                          {languageLevels.map((level) => (
                            <option key={level.level} value={level.level}>{level.level} : {level.description}</option>
                          ))}
                        </select>
                      </div>
                      <p className="text-red-700">{errorModal ? errorModal : ''}</p>
                      <button
                        type="button"
                        onClick={handleAddLanguage}
                        className="ml-2 mt-4 bg-primary text-white font-bold py-2 px-4"
                      >
                        Ajouter
                      </button>
                    </SkillModal>
                  )}
                  <p className="text-red-700">{error?.language}</p>
                </div>
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <div>
                  <h4 className="text-primary text-2xl ">Vos Expériences pro</h4>
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  <p>Stages, emplois d'été, projets personnels :</p>
                  <div className="w-full flex flex-wrap gap-3">
                    {experiences.map((experience) => (
                      <div key={experience.id} className="flex items-center p-1 w-fit bg-primary text-white">
                        <p>{experience.position} : {experience.company} ({new Date(experience.startDate).getFullYear()})</p>
                        <button
                          onClick={() => handleRemoveExperience(experience.id)}
                          className="ml-2"
                        >
                          <FaXmark />
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsExperienceModalOpen(true)}
                    className="text-primary bg-fourth/50 flex items-center gap-2 px-2 py-1 mt-2"
                  >
                    Ajouter <FaPlus className="text-xs" />
                  </button>
                  {isExperienceModalOpen && (
                    <SkillModal closeModal={() => setIsExperienceModalOpen(false)}>
                      <h2>Ajouter une compétence</h2>
                      <div className="mt-4 space-y-4">
                        <input
                          type="text"
                          placeholder="Nom de l'entreprise"
                          ref={experienceCompanyRef}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Poste occupé"
                          ref={experiencePositionRef}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                        <textarea
                          placeholder="Description"
                          ref={experienceDescriptionRef}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                        <div className="flex space-x-4">
                          <input
                            type="date"
                            placeholder="Date de début"
                            ref={experienceStartDateRef}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                          <input
                            type="date"
                            placeholder="Date de fin"
                            ref={experienceEndDateRef}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <p className="text-red-700">{errorModal ? errorModal : ''}</p>
                        <button
                          type="button"
                          onClick={handleAddExperience}
                          className="w-full p-2 bg-primary text-white "
                        >
                          Ajouter
                        </button>
                      </div>
                    </SkillModal>
                  )}
                </div>
                <span className="block w-full h-0.5 bg-grey/50"></span>
                <div className="space-y-6">
                  <h4 className="text-primary text-2xl ">CV et autres documents</h4>
                  <p>Importez votre CV et votre lettre de motivation ou ajoutez tout document utile à votre candidature (présentation détaillée de vos projets, portfolio, etc.)</p>
                  <div className="space-y-6">
                    <p><span className="text-dark font-semibold">Votre CV</span> (format PDF, 20Mo max)</p>
                    {!CV && (
                      <div>
                        <input
                          className="hidden"
                          id="CV-input"
                          type="file"
                          accept="application/pdf"
                          name="profilePic"
                          onChange={handleCVUpload}

                        />
                        <label htmlFor="CV-input" className="bg-fourth/50 space-x-2 flex flex-row justify-center items-center text-center cursor-pointer w-fit py-3 px-5 border-2 border-primary border-dashed rounded text-primary">
                          <IoIosLink className="text-primary text-xl" />
                          <p className="text-grey">Importer votre CV</p>
                        </label>
                      </div>
                    )}
                    {CV && (
                      <div className="flex space-x-4">
                        <p className="text-primary">{CV?.name}</p>
                        <button onClick={() => setCV(null)} className="flex items-center font-bold text-dark h-fit rounded bg-grey/50 cursor-pointer">
                          <FaXmark className="w-7 h-7" />
                        </button>
                      </div>
                    )}
                    <p className="text-red-700">{error?.cv}</p>
                  </div>
                  <div className="space-y-6">
                    <p><span className="text-dark font-semibold">Lettre de motivation</span> (format PDF, 20Mo max)</p>
                    {!letter && (
                      <div>
                        <input
                          className="hidden"
                          id="letter-input"
                          type="file"
                          accept="application/pdf"
                          name="profilePic"
                          onChange={handleLetterUpload}

                        />
                        <label htmlFor="letter-input" className="bg-fourth/50 space-x-2 flex flex-row justify-center items-center text-center cursor-pointer w-fit py-3 px-5 border-2 border-primary border-dashed rounded text-primary">
                          <IoIosLink className="text-primary text-xl" />
                          <p className="text-grey">Importer votre lettre de motivation</p>
                        </label>
                      </div>
                    )}
                    {letter && (
                      <div className="flex space-x-4">
                        <p className="text-primary">{letter?.name}</p>
                        <button onClick={() => setLetter(null)} className="flex items-center font-bold text-dark h-fit rounded bg-grey/50 cursor-pointer">
                          <FaXmark className="w-7 h-7" />
                        </button>
                      </div>
                    )}
                    <p className="text-red-700">{error?.letter}</p>
                  </div>
                  <div className="space-y-6">
                    <p><span>Autre document</span> (format PDF ou ZIP, 50Mo max)</p>
                    {!otherFile && (
                      <div>
                        <input
                          className="hidden"
                          id="other-input"
                          type="file"
                          accept="application/pdf, application/zip"
                          name="profilePic"
                          onChange={handleOtherUpload}
                        />
                        <label htmlFor="other-input" className="bg-fourth/50 space-x-2 flex flex-row justify-center items-center text-center cursor-pointer w-fit py-3 px-5 border-2 border-primary border-dashed rounded text-primary">
                          <IoIosLink className="text-primary text-xl" />
                          <p className="text-grey">Importez un autre document</p>
                        </label>
                      </div>
                    )}
                    {otherFile && (
                      <div className="flex space-x-4">
                        <p className="text-primary">{otherFile?.name}</p>
                        <button onClick={() => setOtherFile(null)} className="flex items-center font-bold text-dark h-fit rounded bg-grey/50 cursor-pointer">
                          <FaXmark className="w-7 h-7" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </form>
            <div>
              <Link to={`/offre/${offer.id}`} type="button" className="w-fit border border-dark text-dark px-6 py-3 flex gap-2"><IoMdArrowBack className="text-xl" /> Retour</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Application;