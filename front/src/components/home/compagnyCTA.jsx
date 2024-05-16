import React from "react";
import Button from "../utils/button.jsx";

function CompagnyCTA(){


  return (
    <div className={` relative overflow-hidden flex flex-row md:flex-row items-center justify-center bg-primary px-8 w-[88vw] space-x-4 `}
      style={{clipPath: "polygon(20% 0, 100% 0, 100% 85%, 80% 100%, 0 100%, 0 15%)"}}>
      <div className={`flex flex-col space-y-6 w-[30vw]`}>
        <h3 className={`text-4xl font-bold text-white`}>Entreprises, déposez vos offres gratuitement</h3>
        <p className={`text-white`}>Vous pourrez gérer votre planning d'accueil et bénéficier de nombreux service intégrés</p>
        <Button text={"Créez votre compte"} path={"*"} />
      </div>
      <div className="pt-28" >
        <img src="/home/dashboardCompagny.svg" className={`w-[45vw]`} alt="dashboard Compagny" />
      </div>
    </div>
  )
}

export default CompagnyCTA;