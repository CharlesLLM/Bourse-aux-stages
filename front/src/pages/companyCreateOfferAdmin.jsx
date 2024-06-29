
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
        //step 1
        offerName: "",
        offerType: "",
        offerPay: "",
        offerProfiles: [],
        offerSkills: [],
        //step 2
        offerAbout: "",
        offerMission: "",
        offerResearchedProfile: "",
        //step3
        offerCreationDate: "",
        offerPublishedDate: "",
        offerDeadline: "",
        offerStartDate: "",
        offerEndDate: ""
    })
    console.log(formData);

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    return (
        <div className="mt-12 flex flex-col gap-4 md:px-32">
            <OfferAdminHeader companyName={company} showCreateButton={false} />
            <OfferCreationHeader currentStep={step} />
            <div className="mt-10">
                { step == 1 && <OfferCreationStepType formData={formData} setFormData={setFormData} />}
                { step == 2 && <OfferCreationStepDescription formData={formData} setFormData={setFormData} />}
                { step == 3 && <OfferCreationStepPublishment formData={formData} setFormData={setFormData} />}
                <div className="flex flex-row justify-between my-10">
                    { step > 1 && (
                        <a 
                        onClick={prevStep}
                        className="flex flex-row gap-2 flex-nowrap justify-center items-center px-6 py-3 w-54 h-[50px] leading-none text-white bg-primary hover:cursor-pointer"> 
                            Etape précédente
                        </a>
                    )}
                    { step == 1 && (
                        //cas première étape pour alligner le bouton à gauche
                        <div>
                        </div>
                    )}
                    { step < 3 && (                        
                        <a 
                        onClick={nextStep}
                        className="flex flex-row gap-2 flex-nowrap justify-center items-center px-6 py-3 w-54 h-[50px] leading-none text-white bg-primary hover:cursor-pointer"> 
                            Etape suivante
                        </a>
                    )}
                    { step == 3 && (
                        <a 
                        onClick={prevStep}
                        className="flex flex-row gap-2 flex-nowrap justify-center items-center px-6 py-3 w-54 h-[50px] leading-none text-white bg-green-500 hover:cursor-pointer"> 
                            <FiSend />
                            Publier l'offre
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
  }

  export default CompanyCreateOfferAdmin;
