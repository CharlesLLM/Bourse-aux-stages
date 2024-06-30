import { useState } from "react";
import OfferCreationHeader from "../components/companyOffersAdmin/offerCreationHeader.jsx";
import OfferAdminHeader from "../components/companyOffersAdmin/offerAdminHeader.jsx";
import OfferCreationStepDescription from "../components/companyOffersAdmin/offerCreationStepDescription.jsx";
import OfferCreationStepType from "../components/companyOffersAdmin/offerCreationStepType.jsx";
import OfferCreationStepPublishment from "../components/companyOffersAdmin/offerCreationStepPublishment.jsx";
import { FiSend } from "react-icons/fi";

function CompanyCreateOfferAdmin() {
    const company = "coinbase";
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        offerName: "",
        offerType: "",
        offerPay: "",
        offerProfiles: [],
        offerSkills: [],
        // Step 2
        offerAbout: "",
        offerMission: "",
        offerRequiredProfile: "",
        charCountAbout: 0,
        charCountMission: 0,
        charCountRequiredProfile: 0,
        // Step 3
        offerPublishedDate: "",
        offerDeadline: "",
        offerStartDate: "",
        offerEndDate: ""
    });

    const [errors, setErrors] = useState({});

    const validateStep1 = () => {
        let valid = true;
        const newErrors = {};

        if (formData.offerName.length < 50) {
            newErrors.offerName = "Le nom de l'offre doit contenir au moins 50 caractères.";
            valid = false;
        }
        if (!formData.offerType) {
            newErrors.offerType = "Veuillez sélectionner le type d'offre.";
            valid = false;
        }
        if (formData.offerPay && isNaN(formData.offerPay)) {
            newErrors.offerPay = "La rémunération doit être un nombre.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const validateStep2 = () => {
        let valid = true;
        const newErrors = {};
    
        if (formData.offerAbout.length < 300) {
            newErrors.offerAbout = "Le champ A propos doit contenir au moins 300 caractères.";
            valid = false;
        } else if (formData.charCountAbout > 500) {
            newErrors.offerAbout = "Le champ A propos ne doit pas dépasser 500 caractères.";
            valid = false;
        //3ème verif au cas ou il y'a bcp de caractères specaiux 
        } else if (formData.offerAbout.length > 5000) {
            newErrors.offerAbout = "Le champ A propos est trop long.";
            valid = false;
        }
    
        if (formData.offerMission.length < 300) {
            newErrors.offerMission = "Le champ Mission doit contenir au moins 300 caractères.";
            valid = false;
        } else if (formData.charCountMission > 500) {
            newErrors.offerMission = "Le champ Mission ne doit pas dépasser 500 caractères.";
            valid = false;
        } else if (formData.offerMission.length > 5000) {
            newErrors.offerMission = "Le champ Mission est trop long.";
            valid = false;
        }
    
        if (formData.offerRequiredProfile.length < 300) {
            newErrors.offerRequiredProfile = "Le champ Profil Recherché doit contenir au moins 300 caractères.";
            valid = false;
        } else if (formData.charCountRequiredProfile > 500) {
            newErrors.offerRequiredProfile = "Le champ Profil recherché ne doit pas dépasser 500 caractères.";
            valid = false;
        } else if (formData.offerRequiredProfile.length > 5000) {
            newErrors.offerRequiredProfile = "Le champ Profil est trop long.";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const validateStep3 = () => {
        let valid = true;
        const newErrors = {};
    
        const {
            offerPublishedDate,
            offerDeadline,
            offerStartDate,
            offerEndDate
        } = formData;
    
        if (!offerPublishedDate) {
            newErrors.offerPublishedDate = "Veuillez sélectionner une date de publication.";
            valid = false;
        } else if (new Date(offerPublishedDate) >= new Date(offerStartDate)) {
            newErrors.offerPublishedDate = "La date de publication doit être antérieure à la date de début de l'offre.";
            valid = false;
        }
    
        if (!offerDeadline) {
            newErrors.offerDeadline = "Veuillez sélectionner une date limite de candidature.";
            valid = false;
        } else if (new Date(offerDeadline) >= new Date(offerStartDate)) {
            newErrors.offerDeadline = "La date limite de candidature doit être antérieure à la date de début de l'offre.";
            valid = false;
        }
    
        if (!offerStartDate) {
            newErrors.offerStartDate = "Veuillez sélectionner une date de début de l'offre.";
            valid = false;
        } else if (offerEndDate && new Date(offerStartDate) >= new Date(offerEndDate)) {
            newErrors.offerStartDate = "La date de début de l'offre doit être antérieure à la date de fin de l'offre.";
            valid = false;
        }
    
        if (!offerEndDate) {
            newErrors.offerEndDate = "Veuillez sélectionner une date de fin de l'offre.";
            valid = false;
        } else if (new Date(offerEndDate) <= new Date(offerStartDate)) {
            newErrors.offerEndDate = "La date de fin de l'offre doit être postérieure à la date de début de l'offre.";
            valid = false;
        }
        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async () => {
        let isValid = true;
    
        isValid = validateStep1();
        if (isValid) isValid = validateStep2();
        if (isValid) isValid = validateStep3();

        formData.offerPay = formData.offerPay === "" ? 0 : formData.offerPay;
    
        if (isValid) {
            try {
                let url = `${import.meta.env.VITE_BACK_ENDPOINT}offer-create`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.offerName,
                        type: formData.offerType,
                        description: formData.offerAbout,
                        mission: formData.offerMission,
                        requiredProfile: formData.offerRequiredProfile,
                        promoteStatus: null,
                        requiredLevel: null,
                        distance: null, 
                        revenue: formData.offerPay,
                        remote: false, 
                        availablePlaces: null,
                        endPublicationDate: formData.offerPublishedDate,
                        startDate: formData.offerStartDate,
                        endDate: formData.offerEndDate,
                        profiles: formData.offerProfiles,
                        skills: formData.offerSkills,
                    }),
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Erreur lors de la création de l\'offre :', errorData);
                } else {
                    const responseData = await response.json();
                    console.log('Offre créée avec succès :', responseData);
                }
            } catch (error) {
                console.error('Erreur lors de la requête HTTP :', error);
            }
        } else {
            console.log("Le formulaire contient des erreurs :", errors);
        }
    };
    

    const nextStep = () => {
        if (step === 1 && validateStep1()) setStep(step + 1);
        else if (step === 2 && validateStep2()) setStep(step + 1);
        else if (step === 3 && validateStep3()) setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="mt-12 flex flex-col gap-4 md:px-32">
            <OfferAdminHeader companyName={company} showCreateButton={false} />
            <OfferCreationHeader currentStep={step} />
            <div className="mt-10">
                {step === 1 && (
                    <OfferCreationStepType
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {step === 2 && (
                    <OfferCreationStepDescription
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}
                {step === 3 && (
                    <OfferCreationStepPublishment
                        formData={formData}
                        setFormData={setFormData}
                    />
                )}

                {Object.keys(errors).length > 0 && (
                    <div className="mt-4 p-4 bg-red-100 text-red-500 border border-red-400 rounded">
                        <p className="font-bold">Erreurs :</p>
                        <ul className="list-disc list-inside">
                            {Object.values(errors).map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex flex-row justify-between my-10">
                    {step > 1 && (
                        <a
                            onClick={prevStep}
                            className="flex flex-row gap-2 flex-nowrap justify-center items-center px-6 py-3 w-54 h-[50px] leading-none text-white bg-primary hover:cursor-pointer"
                        >
                            Etape précédente
                        </a>
                    )}
                    { step == 1 && (
                        //cas première étape pour alligner le bouton à gauche
                        <div>
                        </div>
                    )}
                    {step < 3 && (
                        <a
                            onClick={nextStep}
                            className="flex flex-row gap-2 flex-nowrap justify-center items-center px-6 py-3 w-54 h-[50px] leading-none text-white bg-primary hover:cursor-pointer"
                        >
                            Etape suivante
                        </a>
                    )}
                    {step === 3 && (
                        <button
                            onClick={handleSubmit}
                            className="flex flex-row gap-2 flex-nowrap justify-center items-center px-6 py-3 w-54 h-[50px] leading-none text-white bg-green-500 hover:cursor-pointer"
                        >
                            <FiSend />
                            Publier l'offre
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CompanyCreateOfferAdmin;
