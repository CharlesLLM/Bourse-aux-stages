import { FaFacebookF, FaDribbble, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

function Footer(){
  return (
    <div className="bg-dark px-32 p-12">
      <div className="flex flex-row flex-wrap place-content-around text-borderGrey h-auto pb-16 gap-8 sm:gap-3">
        <div className="w-4/12 min-w-56">
          <div className="flex flex-row flex-nowrap gap-2">
            <img src="/logo.svg" className="w-8 h-8"></img>
            <h3 className="text-white text-2xl font-bold"> Bourse aux Stages </h3>
          </div>
          <p> Première plateforme dédiée à la recherche de stages et d’alternance qui relie automatiquement les étudiants et les entreprises.</p>
        </div>
        <ul className="w-3/12 min-w-56 flex flex-col flex-wrap h-40 gap-2">
          <li><a className="hover:cursor-pointer hover:text-white">Accueil</a></li>
          <li><a className="hover:cursor-pointer hover:text-white">Offres</a></li>
          <li><a className="hover:cursor-pointer hover:text-white">Demandes</a></li>
          <li><a className="hover:cursor-pointer hover:text-white">Entrerprises</a></li>
          <li><a className="hover:cursor-pointer hover:text-white">Etudiants</a></li>
          <li><a className="hover:cursor-pointer hover:text-white">Blog</a></li>
          <li><a className="hover:cursor-pointer hover:text-white">Sponsors</a></li>
          <li><a className="hover:cursor-pointer hover:text-white">Mentions légales</a></li> 
          <li><a className="hover:cursor-pointer hover:text-white">Données personnelles</a></li>
          <li><a className="hover:cursor-pointer hover:text-white">Nous contacter</a></li>
        </ul>
        <div className="w-4/12 min-w-56">
          <div className="w-3/4">
            <h4 className="text-white text-lg font-semibold">Étudiants, créez votre compte</h4>
            <p className="py-6">Recevez automatiquement par email les offres qui vous intéressent !</p>
          </div>
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2">
           <input name="email" className="border-b-2 border-slate-700 text-grey h-12 p-4 w-56" placeholder="Votre email"></input>
            <button className="bg-primary px-6 text-white h-12 w-32"> C&apos;est parti </button>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-white opacity-10 mt-8">

      </div>
      <div className="h-16 flex flex-row flex-wrap place-content-between pt-10">
        <div className="text-white opacity-30">
          2024 @  Bourse aux Stages • Tous droits réservés
        </div>
        <div className="flex flex-row flex-nowrap gap-2 text-white hover:cursor-pointer">
          <span className="bg-[#2d313d] rounded-full h-8 w-8 flex justify-center items-center"><FaFacebookF/></span>
          <span className="bg-[#2d313d] rounded-full h-8 w-8 flex justify-center items-center"><FaInstagram/></span>
          <span className="bg-[#2d313d] rounded-full h-8 w-8 flex justify-center items-center"><FaDribbble/></span>
          <span className="bg-[#2d313d] rounded-full h-8 w-8 flex justify-center items-center"><FaTwitter/></span>
          <span className="bg-[#2d313d] rounded-full h-8 w-8 flex justify-center items-center"><FaLinkedinIn/></span>
        </div>
      </div>
    </div>
  )
}

export default Footer;
