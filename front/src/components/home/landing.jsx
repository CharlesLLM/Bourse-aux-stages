import React, { useEffect, useState } from "react";
import Searchbar from './searchbar.jsx';
import '../../../assets/styles/underline.scss';

function Landing() {
  const [counts, setCounts] = useState({ internships: 0, apprenticeships: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}offers/count`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCounts({
          internships: data.stage,
          apprenticeships: data.alternance,
        });
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-[#F8F8FD] relative overflow-hidden h-[600px]">
        <div className="flex flex-col mx-6 md:mx-32 mt-6 pb-20">
            <div className="z-50 mt-12 w-2/3">
                <div className="mb-8">
                    <h1 className="font-bold text-4xl md:text-5xl lg:text-7xl lg:leading-[84px]"> Trouver un stage n'aura jamais été <span className="text-secondary custom-underline">aussi facile!</span></h1>
                    <p className="text-darkGray text-xl mt-12 font-normal leading-8"> Trouvez les offres de stage ou d'alternance près de chez vous qui correspondent à votre profil et à vos attentes.</p>
                </div>
                {/* <Searchbar /> */}
                <div className="mt-2 text-[#25324B]">
                  <p className="text-darkGray text-lg font-normal">
                    <span className="text-secondary font-bold">{counts.internships}</span> offres de <span className="font-bold">stages</span> | 
                    <span className="text-secondary font-bold"> {counts.apprenticeships}</span> offres <span className="font-bold">d'alternance</span> n'attendent que vous !
                  </p>
                </div>
            </div>
            <img src="images/landingMan.png" className="absolute w-[500px] right-16 top-14 z-20" />
            <img src="images/landing-bottom-right-figure.svg" className="absolute w-16 right-0 bottom-0 z-30" />
            {/* <img src="images/rectangle1.svg" className="absolute w-[360px] ml-[340px] bottom-0 z-10" /> */}
            <img src="images/rectangle2.svg" className="absolute w-[520px] right-40 -bottom-12 z-10" />
            <img src="images/rectangle3.svg" className="absolute w-[520px] right-0 bottom-0 z-10" />
            <img src="images/rectangle4.svg" className="absolute w-[260px] right-[360px] top-14 z-10" />
        </div>
    </div>
  )
}

export default Landing;
