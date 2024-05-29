import React from "react";

function ListHero() {
  return (
    <div className="h-[250px] w-full bg-lightGrey flex flex-col items-center justify-center">
      <p className="text-5xl mb-10">Liste des&nbsp;
        <span className="text-secondary relative">
          entreprises
          <img src="underline.svg" alt="Underline" className="absolute top-full left-0 w-full" />
        </span>
      </p>
      <p className="text-lg font-normal text-textGrey">Découvrez les entreprises qui proposent des offres de stage ou d'alternance</p>
    </div>
  )
}

export default ListHero;
