function Navbar() {
  return (
    <div className="h-20 flex items-center justify-between px-8 md:px-16 xl:px-32">
      <a href="/" className="flex items-center gap-2.5">
        <img src="/logo.svg" alt="Logo" />
        <p className="title md:text-xl xl:text-2xl">Bourse aux stages</p>
      </a>
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
        <a href="/login" className="flex justify-center items-center px-6 py-3 w-40 h-[50px] leading-none text-primary">Se connecter</a>
        <div className="h-10 w-[1px] bg-slate-200"></div>
        <a href="/register" className="flex justify-center items-center px-6 py-3 w-48 h-[50px] leading-none text-white bg-primary">Créer un compte</a>
      </div>
    </div>
  )
}

export default Navbar;
