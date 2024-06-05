import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
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

function Application() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errorModal, setErrorModal] = useState(null)

  const genderRef = useRef(null);
  const firstnameRef = useRef(null);
  const nameRef = useRef(null);
  const birthDayRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const confirmEmailRef = useRef(null);
  const addressRef = useRef(null);
  const secondAddressRef = useRef(null);
  const postalCodeRef = useRef(null);
  const cityRef = useRef(null);
  const personalWebsiteRef = useRef(null);
  const linkedinRef = useRef(null);
  const drivingLicenceRef = useRef(false);
  const disabilityRef = useRef(false);
  const studyLevelRef = useRef(null);
  const preparedDiplomaRef = useRef(null);
  const schoolNameRef = useRef(null);
  const studiesName = useRef(null);
  const skillRef = useRef(null);
  const languageRef = useRef(null);
  const languageLevelRef = useRef(null);
  const experienceCompanyRef = useRef(null);
  const experiencePositionRef = useRef(null);
  const experienceDescriptionRef = useRef(null);
  const experienceStartDateRef = useRef(null);
  const experienceEndDateRef = useRef(null);

  const genders = ['Homme', 'Femme', 'Autre']
  const studyLevels = [
    'Bac -2',
    'Bac -1',
    'Baccalauréat',
    'Bac +1',
    'Bac +2',
    'Bac +3',
    'Bac +4',
    'Bac +5',
    'Bac +6',
    'Bac +7',
  ]
  const diplomaLevels = [
    "Bac",
    "BTS",
    "Licence",
    "Master",
    "Doctorat",
    "Autre"
  ];
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

  const handleAddLanguage = () => {
    setErrorModal("");
    const newLangName = languageRef.current.value;
    const newLangLevel = languageLevelRef.current.value;
    if (newLangName.length > 0) {
      const newLang = {id: uuidv4(), name: newLangName, level: newLangLevel};
      setLanguages([...languages, newLang]);
      setIsLanguageModalOpen(false);
      languageRef.current.value = "";
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

  useEffect(() => {
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

    getOffer();
  }, []);

  const handleRemoveSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleRemoveLanguage = (id) => {
    setLanguages(languages.filter(language => language.id !== id));
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
    // const file = event.target.files[0];
    //
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setSelectedFile(file);
    //     setPreview(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // } else {
    //   setSelectedFile(null);
    //   setPreview(null);
    // }
    console.log('upload')
  };

  const handleCVUpload = (event) => {
    console.log('upload', event)
  }

  const handleLetterUpload = (event) => {
    console.log('upload', event)
  }

  const handleOtherUpload = (event) => {
    console.log('upload', event)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    document.getElementById('file-input').value = '';
  };

  const handleSubmit = () => {
    const application = {
      personalInfo: {
        gender: genderRef.current.value,
        firstname: firstnameRef.current.value,
        lastname: nameRef.current.value,
        birthDay: birthDayRef.current.value,
        phoneNumber: phoneNumberRef.current.value,
        email: emailRef.current.value,
        confirmEmail: confirmEmailRef.current.value,
        address: addressRef.current.value,
        secondAddress: secondAddressRef.current.value,
        postalCode: postalCodeRef.current.value,
        city: cityRef.current.value,
        personalWebsite: personalWebsiteRef.current.value,
        linkedin: linkedinRef.current.value,
        drivingLicence: drivingLicenceRef.current.checked,
        disability: disabilityRef.current.checked,
      },
      currentSituation: {
        studyLevel: studyLevelRef.current.value,
        preparedDiploma: preparedDiplomaRef.current.value,
        schoolName: schoolNameRef.current.value,
        studiesName: studiesName.current.value,
        motivations: '', // You need to add the reference for the rich text editor
      },
      skills: skills.map(skill => skill.name),
      languages: languages.map(language => ({name: language.name, level: language.level})),
      experiences: experiences.map(experience => ({
        company: experience.company,
        position: experience.position,
        description: experience.description,
        startDate: experience.startDate,
        endDate: experience.endDate
      })),
      // cv: selectedFile, // You need to store the uploaded file here
      // letter: selectedFile, // You need to store the uploaded file here
      // otherDocument: selectedFile, // You need to store the uploaded file here
    };

    // Do something with the application object, like sending it to a server
    console.log(application);

    // Navigate to offer page
    navigate(`/offre/${offer.id}`);
  };


  return (
    <div>
      <OfferHeader offer={offer} />
      <form className="w-full flex flex-col md:flex-row md:space-x-12 px-8 space-y-6 md:space-y-0">
        <div className="space-y-6 w-full md:w-2/3">
          <h2 className="text-4xl">Postulez à cette offre de stage</h2>
          <span className="block w-full h-0.5 bg-grey/50"></span>
          <div className="space-y-6 ">
            <h3 className="text-2xl">Vous êtes</h3>
            <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between space-y-6 sm:space-y-0">
              <SelectInput options={genders} name="gender" label="Genre" required={true} inputRef={genderRef} />
              <Input type="text" name="firstname" label="Prénom" required={true} inputRef={firstnameRef} />
              <Input type="text" name="lastname" label="Nom" required={true} inputRef={nameRef} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input type="date" name="birthDay" label="Date de naissance" required={true} inputRef={birthDayRef} />
              <Input type="tel" name="birthDay" label="Numéro de téléphone" max={10} required={true} inputRef={phoneNumberRef} />
              <Input type="email" name="email" label="Email" required={true} inputRef={emailRef} />
              <Input type="email" name="emailConfirm" label="Confirmer votre email" required={true} inputRef={confirmEmailRef} />
              <Input type="text" name="address" label="Adresse" required={false} inputRef={addressRef} />
              <Input type="text" name="secondAddress" label="Complement d'adresse" required={false} inputRef={secondAddressRef} />
              <Input type="number" name="postalCode" label="Code postal" max={5} required={false} inputRef={postalCodeRef} />
              <Input type="text" name="city" label="Ville" required={false} inputRef={cityRef} />
            </div>
            <Input type="url" name="personalWebsite" required={false} label="Adresse de votre site web personnel" inputRef={personalWebsiteRef} />
            <Input type="url" name="linkedin" required={false} label="Lien vers votre page Linkedin" inputRef={linkedinRef} />
            <div className="flex space-x-8">
              <Checkbox name="drivingLicence" label="J'ai le permis de conduire" inputRef={drivingLicenceRef} />
              <Checkbox name="disability" label="J'ai une forme d'handicap" inputRef={disabilityRef} />
            </div>
          </div>
          <span className="block w-full h-0.5 bg-grey/50"></span>
          <div className="space-y-6">
            <h3 className="text-2xl">Votre situation actuelle</h3>
            <div className="flex flex-col sm:flex-row sm:justify-between space-y-6 sm:space-y-0">
              <SelectInput inputRef={studyLevelRef} name="studyLevel" required={true} label="Niveau d'études" options={studyLevels} />
              <SelectInput inputRef={preparedDiplomaRef} name="preparedDiploma" required={true} label="Diplôme préparé" options={diplomaLevels} />
              <Input inputRef={schoolNameRef} name="schoolName" label="Nom de l'établissement" type="text" required={true} />
            </div>
            <Input name="studiesName" label="Nom de la formation préparée" type="text" required={true} inputRef={studiesName} />
            <RichText label="Vos atouts & motivations pour postuler à cette offre de stage" />
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
                className="text-primary bg-fourth/50 flex items-center px-2 py-1 mt-2"
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
                  className="border border-gray-400 p-2 rounded mt-2"
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
          </div>
          <span className="block w-full h-0.5 bg-grey/50"></span>
          <div>
            <h4 className="text-primary text-2xl ">Vos pratiques des langues</h4>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Ajoutez les langues que vous pratiquez :</p>
            <div className="w-full flex flex-wrap gap-3">
              {languages.map((language) => (
                <div key={language.id} className="flex items-center p-1 w-fit bg-primary text-white">
                  <p>{language.name} : {language.level}</p>
                  <button
                    onClick={() => handleRemoveLanguage(language.id)}
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
              className="text-primary bg-fourth/50 flex items-center px-2 py-1 mt-2"
            >
              Ajouter <FaPlus className="text-xs" />
            </button>
            {isLanguageModalOpen && (
              <SkillModal closeModal={() => setIsLanguageModalOpen(false)}>
                <h2>Ajouter une Langue</h2>
                <input
                  type="text"
                  placeholder="Nom de la compétence"
                  className="border border-gray-400 p-2 rounded mt-2"
                  ref={languageRef}
                  onKeyDown={handleKeyDown}
                />
                <select ref={languageLevelRef}>
                  <option value="" disabled>Veuillez choisir</option>
                  {languageLevels.map((level) => (
                    <option key={level.level} value={level.level}>{level.level} : {level.description}</option>
                  ))}
                </select>
                <p className="text-red-700">{errorModal ? errorModal : ''}</p>
                <button
                  type="button"
                  onClick={handleAddLanguage}
                  className="ml-2 bg-primary text-white font-bold py-2 px-4 mt-2"
                >
                  Ajouter
                </button>
              </SkillModal>
            )}
          </div>
          <span className="block w-full h-0.5 bg-grey/50"></span>
          <div>
            <h4 className="text-primary text-2xl ">Vos Expériences pro</h4>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <p>Stages, emploies d'été, projets personnels :</p>
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
              className="text-primary bg-fourth/50 flex items-center px-2 py-1 mt-2"
            >
              Ajouter <FaPlus className="text-xs" />
            </button>
            {isExperienceModalOpen && (
              <SkillModal closeModal={() => setIsLanguageModalOpen(false)}>
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
              <input
                className="hidden"
                id="file-input"
                type="file"
                accept="image/png, image/jpeg"
                name="profilePic"
                onChange={handleCVUpload}

              />
              <label htmlFor="file-input" className="bg-fourth/50 space-x-2 flex flex-row justify-center items-center text-center cursor-pointer w-fit py-3 px-5 border-2 border-primary border-dashed rounded text-primary">
                <IoIosLink className="text-primary text-xl" />
                <p className="text-grey">Importer votre CV</p>
              </label>
            </div>
            <div className="space-y-6">
              <p><span className="text-dark font-semibold">Lettre de motivation</span> (format PDF, 20Mo max)</p>
              <input
                className="hidden"
                id="file-input"
                type="file"
                accept="application/pdf"
                name="profilePic"
                onChange={handleLetterUpload}

              />
              <label htmlFor="file-input" className="bg-fourth/50 space-x-2 flex flex-row justify-center items-center text-center cursor-pointer w-fit py-3 px-5 border-2 border-primary border-dashed rounded text-primary">
                <IoIosLink className="text-primary text-xl" />
                <p className="text-grey">Importer votre lettre de motivation</p>
              </label>
            </div>
            <div className="space-y-6">
              <p><span>Autre document</span> (format PDF ou ZIP, 50Mo max)</p>
              <input
                className="hidden"
                id="file-input"
                type="file"
                accept="application/zip, application.zip"
                name="profilePic"
                onChange={handleOtherUpload}
              />
              <label htmlFor="file-input" className="bg-fourth/50 space-x-2 flex flex-row justify-center items-center text-center cursor-pointer w-fit py-3 px-5 border-2 border-primary border-dashed rounded text-primary">
                <IoIosLink className="text-primary text-xl" />
                <p className="text-grey">Importez un autre document</p>
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="pb-20">
        <button type="button" className="mt-6 ml-8 border border-dark text-dark px-6 py-3 flex items-center"><IoMdArrowBack className="text-xl" /> Retour</button>
      </div>
    </div>
  )
}

export default Application;