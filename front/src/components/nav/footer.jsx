import { FaFacebookF, FaDribbble, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

function Footer(){
  return (
    <div className="bg-dark px-32 pt-16 font-normal">
      <div className="flex place-content-around text-borderGrey h-auto pb-16 gap-8 sm:gap-3">
        <div className="w-[40%] min-w-56 space-y-3">
          <div className="flex flex-nowrap gap-2">
            <img src="/logo.svg" className="size-8"></img>
            <h3 className="text-white text-2xl font-bold">Bourse aux Stages</h3>
          </div>
          <p>Première plateforme dédiée à la recherche de stages et d’alternance qui relie automatiquement les étudiants et les entreprises.</p>
        </div>
        <ul className="w-[30%] min-w-56 flex gap-12">
          <div className="space-y-4">
            <li><a className="cursor-pointer hover:text-white">Accueil</a></li>
            <li><a className="cursor-pointer hover:text-white">Offres</a></li>
            <li><a className="cursor-pointer hover:text-white">Demandes</a></li>
            <li><a className="cursor-pointer hover:text-white">Entreprises</a></li>
            <li><a className="cursor-pointer hover:text-white">Etudiants</a></li>
          </div>
          <div className="space-y-4">
            <li><a className="cursor-pointer hover:text-white">Blog</a></li>
            <li><a className="cursor-pointer hover:text-white">Sponsors</a></li>
            <li><a className="cursor-pointer hover:text-white">Mentions légales</a></li> 
            <li><a className="cursor-pointer hover:text-white">Données personnelles</a></li>
            <li><a className="cursor-pointer hover:text-white">Nous contacter</a></li>
          </div>
        </ul>
        <div className="w-[30%] min-w-56">
          <div className="w-3/4 space-y-5 pb-24">
            <h4 className="text-white text-lg font-semibold">Étudiants, créez votre compte</h4>
            <p>Recevez automatiquement par email les offres qui vous intéressent !</p>
          </div>
          <div className="flex flex-nowrap gap-2">
            <input name="email" className="border-b-2 border-slate-700 text-grey h-12 p-4 w-56" placeholder="Votre email"></input>
            <button className="bg-primary w-[136px] h-12 px-6 py-3 text-white font-bold">C&apos;est parti</button>
          </div>
        </div>
      </div>
      <hr className="h-0.5 border-white/10"></hr>
      <div className="flex flex-row flex-wrap place-content-between py-10">
        <div className="text-white opacity-50">
          2024 @  Bourse aux Stages • Tous droits réservés
        </div>
        <div className="flex flex-nowrap gap-6 text-white cursor-pointer">
          <span className="bg-white/10 rounded-full h-8 w-8 flex justify-center items-center"><FaFacebookF/></span>
          <span className="bg-white/10 rounded-full h-8 w-8 flex justify-center items-center"><FaInstagram/></span>
          <span className="bg-white/10 rounded-full h-8 w-8 flex justify-center items-center"><FaDribbble/></span>
          <span className="bg-white/10 rounded-full h-8 w-8 flex justify-center items-center"><FaTwitter/></span>
          <span className="bg-white/10 rounded-full h-8 w-8 flex justify-center items-center"><FaLinkedinIn/></span>
        </div>
      </div>
    </div>
  )
}

export default Footer;
