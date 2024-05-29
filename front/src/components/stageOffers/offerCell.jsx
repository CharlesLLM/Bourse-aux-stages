import React from 'react';

const Offer = ({ logo, offerName, companyName, location, startDate, endDate, daysSpan, remainingDays, tags }) => {

  const progressBarColor = remainingDays > 7 ? '#56CDAD' : remainingDays > 5 ? '#FF9900' : '#FF007A';

  // Calcule taille de la bare de prog, min et max pour s'assurer que la barre ne dépasse pas de la div et qu'il y'aura au moins une petite partie de celle-ci affiché même
  //à zero
  const progressBarWidth = Math.max(Math.min(Math.floor((remainingDays / daysSpan) * 100), 100), 1);
  console.log(progressBarWidth)

  return (
    <div className="flex flex-row flex-wrap justify-between border border-[#25324B] p-5 border-opacity-10">
        <div className="w-28">
            <img src={`images/${logo}`} alt={`${companyName} logo`} className="offer-logo" />
        </div>
      <div>
        <h3 className="text-xl font-bold">{offerName}</h3>
        <p><span className="font-semibold">{companyName}</span> • {location} • Du {startDate} au {endDate} ({daysSpan} jours)</p>
        {tags.map((tag, index) => (
            <span key={index} className="offer-tag"> {tag} </span>
        ))}
      </div>
      <div className='flex flex-col justify-end items-end'>
        <button className="bg-[#4640DE] py-3 px-7 text-white font-semibold w-52"> En savoir plus</button>
        <div className='w-52'>
          <div className="w-full bg-gray-200 h-1.5 dark:bg-gray-700 mt-4 mb-1">
              <div className="h-1.5" style={{ width: `${progressBarWidth}%`, backgroundColor: progressBarColor  }}></div>
          </div>
            {remainingDays < 1 
              ? "Reste moins d'un jour pour postuler" 
              : remainingDays == 1 
              ? "Reste 1 jour pour postuler" 
              : `Reste ${remainingDays} jours pour postuler`}
        </div>
      </div>
    </div>
  );
};

export default Offer;