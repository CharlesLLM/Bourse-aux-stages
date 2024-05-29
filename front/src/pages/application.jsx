import React, {useRef} from "react";
import Layout from "../layout/layout.jsx";
import IdentityForm from "../components/forms/identityForm.jsx";
import GraduationForm from "../components/forms/graduationForm.jsx";
import Checkbox from "../components/utils/checkbox.jsx";
import UploadProfilePic from "../components/forms/uploadProfilePic.jsx";
import Skills from "../components/forms/skills.jsx";

function Application() {

  const createAccountRef = useRef(null);

  const handleSubmit = () => {
    console.log('submit')
  }
  return (
    <Layout>
      <form className="w-full flex flex-col md:flex-row space-x-12 px-8">
        <div className="space-y-6 w-full md:w-2/3">
          <h2 className="text-4xl">Postulez à cette offre de stage</h2>
          <span className="block w-full h-0.5 bg-grey/50"></span>
          <IdentityForm />
          <span className="block w-full h-0.5 bg-grey/50"></span>
          <GraduationForm />
          <span className="block w-full h-0.5 bg-grey/50"></span>
          <Checkbox name="createAccount" inputRef={createAccountRef} label="Créer mon compte membre pour éviter de ressaisir ces informations la fois prochaine" />
          <button type="button" className="bg-primary w-full py-4" onClick={handleSubmit}>Postuler à cette offre de stage</button>
          <p className="text-sm text-dark">En validant ce formulaire, vous confirmez que vous acceptez nos <a href="#" className="text-primary underline">Conditions Générales d'utilisation</a> et notre <a href="#" className="text-primary underline">politique de confidentialité</a></p>
        </div>
        <div className="space-y-6 w-full md:w-1/3">
          <h4 className="text-primary text-2xl ">Votre photo</h4>
          <p>Ajouter votre photo à votre votre profil est apprécié par les entreprises et augmente vos chances</p>
          <UploadProfilePic />
          <span className="block w-full h-0.5 bg-grey/50"></span>
          <Skills title="Vos compétences" desc="Ajoutez jusqu'à 10 compétences"/>
        </div>
      </form>
    </Layout>
  )
}

export default Application;