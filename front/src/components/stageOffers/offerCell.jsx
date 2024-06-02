import React from 'react';

const OfferCell = ({ offer }) => {
  const progressBarColor = offer.remainingDays > 7 ? '#56CDAD' : offer.remainingDays > 5 ? '#FF9900' : '#FF007A';

  // Calcule taille de la bare de prog, min et max pour s'assurer que la barre ne dépasse pas de la div et qu'il y'aura au moins une petite partie de celle-ci affiché même
  //à zero
  const progressBarWidth = Math.max(Math.min(Math.floor((offer.remainingDays / offer.daysSpan) * 100), 100), 1);

  return (
    <div className="flex flex-row flex-wrap justify-between border border-[#25324B] p-5 border-opacity-10 gap-5">
      <div className="w-20 h-20 flex justify-center align-center flex-wrap">
          <img src={`images/${offer.logo}`} alt={`${offer.companyName} logo`}/>
      </div>
      <div className="md:w-6/12">
        <h3 className="text-xl font-bold">{offer.name}</h3>
        <p><span className="font-semibold">{offer.companyName}</span><span className="text-[#7C8493]"> • </span>{offer.location}<span className="text-[#7C8493]"> • </span>Du {offer.startDate} au {offer.endDate} ({offer.daysSpan} jours)</p>
        <div className="flex flex-row gap-2 items-center flex-wrap ">
          {offer.offerType === 'Stage' && <span className="text-[#4640DE] bg-[#F8F8FD] font-semibold px-2 py-1">{offer.offerType}</span>}
          {offer.offerType === 'Alternance' && <span className="text-[#ff6019] bg-[#fff5f1] font-semibold px-2 py-1">{offer.offerType}</span>}
          <span className="bg-[#D6DDEB] w-px h-8 relative inline-block mx-1 mt-1"></span>
          {offer.tags.map((tag, index) => {
            switch (tag) {
              case 'Marketing':
                return <span key={index} className="bg-[#EB85331A] text-[#FFB836] px-2 py-1 rounded-full"> {tag} </span>;
              case 'Design':
                return <span key={index} className="bg-[#56CDAD1A] text-[#56CDAD] px-2 py-1 rounded-full"> {tag} </span>;
              case 'Management':
                return <span key={index} className="bg-[#d6ebc3] text-[#77BF38] px-2 py-1 rounded-full"> {tag} </span>;
              case 'Business':
                return <span key={index} className="bg-[#FFF9D8] text-[#CCB000] px-2 py-1 rounded-full"> {tag} </span>;
              case 'Finance':
                return <span key={index} className="bg-[#b2c8dd] text-[#004990] px-2 py-1 rounded-full"> {tag} </span>;
              case 'Industrie':
                return <span key={index} className="bg-[#B29869] text-[#e7e0d2] px-2 py-1 rounded-full"> {tag} </span>;
              case 'Informatique':
                return <span key={index} className="bg-[#AFA7A4] text-[#F7F6F5] px-2 py-1 rounded-full"> {tag} </span>;  
              case 'Commercial':
                return <span key={index} className="bg-[#DCD8E0] text-[#543D66] px-2 py-1 rounded-full"> {tag} </span>; 
              default:
                return <span key={index} className="offer-tag"> {tag} </span>;
            }
          })}
          { offer.offerType === 'Stage' && offer.daysSpan >= 44 && <span className="text-[#FF007A] before:bg-[#FF007A] before:inline-block before:w-2 before:h-2 before:relative before:rounded-full"> Rémunéré </span>  }
        </div>
      </div>
      <div className='flex flex-col justify-end items-end'>
        <button className="bg-[#4640DE] py-3 px-7 text-white font-semibold w-52"> En savoir plus</button>
        <div className='w-52'>
          <div className="w-full bg-gray-200 h-1.5 dark:bg-gray-700 mt-4 mb-1">
              <div className="h-1.5" style={{ width: `${progressBarWidth}%`, backgroundColor: progressBarColor  }}></div>
          </div>
            {offer.remainingDays < 1 
              ? "Reste moins d'un jour pour postuler" 
              : offer.remainingDays == 1 
                ? "Reste 1 jour pour postuler" 
                : `Reste ${offer.remainingDays} jours pour postuler`
            }
        </div>
      </div>
    </div>
  );
};

export default OfferCell;
