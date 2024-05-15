import React from "react";
import Searchbar from './searchbar.jsx';
import DataOffers from '../../components/home/dataOffers.jsx';
import './landing.css'



function Landing() {
  return (
    <div className="bg-[#F8F8FD] relative overflow-hidden">
        <div className="flex flex-col mx-6 md:mx-32 mt-6 pb-20">
            <div className="max-w-2xl z-50 mt-12">
                <div className="max-w-2xl mb-8">
                    <h1 className="font-extrabold text-4xl md:text-5xl lg:text-7xl"> Trouver un stage n'aura jamais été <span className="text-secondary custom-underline">aussi facile!</span></h1>
                    <p className="text-[#25324B] mt-12"> Trouvez les offres de stage ou d'alternance près de chez vous qui correspondent à votre profil et à vos attentes.</p>
                </div>
                < Searchbar />
                < DataOffers />
            </div>
            <img src="images/landingMan.png" className="absolute w-[500px] ml-[600px] z-20" />
            <img src="images/whiteRectangle.svg" className="absolute w-[250px] md:w-[360px] right-0 bottom-0 z-30" />
            <img src="images/rectangle1.svg" className="absolute w-[360px] ml-[340px] bottom-0 z-10" />
            <img src="images/rectangle2.svg" className="absolute w-[480px] ml-[480px] bottom-0 z-10" />
            <img src="images/rectangle3.svg" className="absolute w-[480px] ml-[660px] bottom-[50px] z-10" />
            <img src="images/rectangle4.svg" className="absolute w-[280px] ml-[540px] bottom-[260px] z-10" />
        </div>
    </div>
  )
}

export default Landing;
