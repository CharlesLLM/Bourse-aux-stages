import { Link } from "react-router-dom";
import {IoIosLogOut} from "react-icons/io";

function Navbar() {
  async function handleLogout() {
    try {
      localStorage.clear();
      location.reload();
    }
    catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="h-20 flex items-center justify-between px-8 md:px-16 xl:px-32">
      <Link to="/" className="flex items-center gap-2.5">
        <img src="/logo.svg" alt="Logo" />
        <p className="title md:text-xl xl:text-2xl">Bourse aux stages</p>
      </Link>
      <ul className="flex gap-5 h-full">
        <li className="flex items-center">
          <Link to="/">Accueil</Link>
        </li>
        <li className="flex items-center relative group">
          <p className="cursor-pointer">Offres</p>
          <ul className="absolute -left-4 top-full w-32 z-20 bg-white rounded shadow-lg opacity-0 transition-all duration-500 transform -translate-y-6 group-hover:opacity-100 group-hover:translate-y-0">
            <Link to="/offres/stage" className="flex items-center px-4 py-2 border-l-2 border-white hover:bg-lightGrey hover:border-primary">
              <li className="whitespace-nowrap">Stage</li>
            </Link>
            <Link to="/offres/alternance" className="flex items-center px-4 py-2 border-l-2 border-white hover:bg-lightGrey hover:border-primary">
              <li className="whitespace-nowrap">Alternance</li>
            </Link>
          </ul>
        </li>
        <li className="flex items-center">
          <Link to="/">Demandes</Link>
        </li>
        <li className="flex items-center">
          <Link to="/entreprises">Entreprises</Link>
        </li>
        <li className="flex items-center">
          <Link to="/">Étudiants</Link>
        </li>
      </ul>
      {localStorage.getItem('token') && localStorage.getItem('user') && (
        <div className="flex items-center space-x-4 justify-center px-8 md:px-16 xl:px-32 cursor-pointer">
          <div onClick={handleLogout} className="flex items-center space-x-4">
            <p className="text-primary flex">Déconnexion</p>
            <IoIosLogOut className="text-primary text-2xl cursor-pointer"/>
          </div>
          <div className="h-10 w-px bg-slate-200"></div>
          <Link to="/admin" className="flex justify-center items-center px-6 py-3 w-48 h-[50px] leading-none text-white bg-primary">Administration</Link>
        </div>
      )}
      {!localStorage.getItem('token') && !localStorage.getItem('user') && (
        <div className="flex items-center gap-4">
          <Link to="/connexion" className="flex justify-center items-center px-6 py-3 w-40 h-[50px] leading-none text-primary">Se connecter</Link>
          <div className="h-10 w-px bg-slate-200"></div>
          <Link to="/inscription" className="flex justify-center items-center px-6 py-3 w-48 h-[50px] leading-none text-white bg-primary">Créer un compte</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar;
