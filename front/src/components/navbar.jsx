import React from "react";

function Navbar() {
  return (
    <div className="h-20 flex items-center px-32 justify-between">
      <div className="flex items-center gap-2.5">
        <img src="logo.svg" alt="Logo" />
        <p className="title">Bourse aux stages</p>
      </div>
      <ul className="flex gap-5 h-full">
        <li className="flex items-center">
          <a href="/">Accueil</a>
        </li>
        <li className="flex items-center">
          <a href="/">Offres</a>
        </li>
        <li className="flex items-center">
          <a href="/">Demandes</a>
        </li>
        <li className="flex items-center">
          <a href="/entreprises">Entreprises</a>
        </li>
        <li className="flex items-center">
          <a href="/">Étudiants</a>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <a href="/login" className="flex items-center px-6 py-3 h-[50px] leading-none text-primary">Se connecter</a>
        <div className="h-10 w-[1px] bg-slate-200"></div>
        <a href="/register" className="flex items-center px-6 py-3 h-[50px] leading-none text-white bg-primary">Créer un compte</a>
      </div>
    </div>
  )
}

export default Navbar;
