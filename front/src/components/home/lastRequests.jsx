import React from "react";
import LinkTo from "../utils/linkTo.jsx";
import {useNavigate} from "react-router-dom";
import {differenceInDays, differenceInMonths, format, parse, parseISO} from 'date-fns';
import {fr} from "date-fns/locale/fr";

function LastRequests() {
  const navigate = useNavigate();
  const data = [
    {
      title: 'Alternance analyste financier',
      firstName: 'Louis',
      age: 25,
      location: 'Paris',
      type: 'Alternance',
      startDate: "30/05/2024",
      endDate: "30/03/2025",
      number: 235,
    },
    {
      title: 'Alternance analyste financier',
      firstName: 'Louis',
      age: 25,
      location: 'Paris',
      type: 'Alternance',
      startDate: "30/05/2024",
      endDate: "30/03/2025",
      number: 130,
    },
    {
      title: 'MStage assistant marketting',
      firstName: 'Louis',
      age: 25,
      location: 'Paris',
      type: 'Stage',
      startDate: "30/05/2024",
      endDate: "30/06/2024",
      number: 235,
    },
    {
      title: 'Alternance analyste financier',
      firstName: 'Louis',
      age: 25,
      location: 'Paris',
      type: 'Alternance',
      startDate: "30/05/2024",
      endDate: "30/03/2025",
      number: 235,
    },
    {
      title: 'InfoStage assistant marketting',
      firstName: 'Louis',
      age: 25,
      location: 'Paris',
      type: 'Stage',
      startDate: "30/05/2024",
      endDate: "30/06/2024",
      number: 235,
    },
    {
      title: 'Alternance analyste financier',
      firstName: 'Louis',
      age: 25,
      location: 'Paris',
      type: 'Alternance',
      startDate: "30/05/2024",
      endDate: "30/03/2025",
      number: 235,
    },
    {
      title: 'Stage assistant marketting',
      firstName: 'Louis',
      age: 25,
      location: 'Paris',
      type: 'Stage',
      startDate: "30/05/2024",
      endDate: "30/06/2024",
      number: 235,
    },
    {
      title: 'Stage assistant marketting',
      firstName: 'Louis',
      age: 25,
      location: 'Paris',
      type: 'Stage',
      startDate: "30/05/2024",
      endDate: "15/06/2024",
      number: 235,
    },
  ];

  const calculateDuration = (start, end) => {
    const startDate = parse(start, 'dd/MM/yyyy', new Date(), { locale: fr });
    const endDate = parse(end, 'dd/MM/yyyy', new Date(), { locale: fr });
    const daysDifference = differenceInDays(endDate, startDate);

    if (daysDifference < 31) {
      return `${daysDifference} jours`;
    } else {
      const monthsDifference = differenceInMonths(endDate, startDate);
      return `${monthsDifference} mois`;
    }
  };

  return (
    <div className="space-y-5 md:space-y-10 bg-lightGrey w-full p-16"
         style={{clipPath: "polygon(10% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 5%)"}}
    >
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between items-start md:items-end">
        <h2 className="xl:text-5xl lg:text-4xl text-3xl">Dernières <span className="text-secondary">demandes</span></h2>
        <LinkTo text={'Tous les profils'} color={'secondary'} page={''} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
        {data.map((request) => (
          <div onClick={() => navigate("/")} className="group flex flex-col xs:flex-row justify-center items-center xs:items-start  w-[70vw] md:w-[40vw] py-5 border border-grey space-y-4 xs:space-y-0 xs:space-x-16 px-4 transition-all cursor-pointer">
            {/*<i className={`${category.icon}`}></i>*/}
            <div className="w-12 h-12 rounded-full bg-third"></div>
            <div className={`flex flex-col space-y-4`}>
              <p className=" lg:text-lg xl:text-xl font-bold">{request.title}</p>
              <div className={`text-grey flex flex-row items-center space-x-2`}>
                <p className={`text-sm font-light`}>{request.firstName} ({request.age})</p>
                <span className={`h-2 w-2 bg-grey rounded-full`}></span>
                <p className={`text-sm font-light`}>{request.location}</p>
              </div>
              <div className={`text-grey flex flex-row items-center space-x-2`}>
                <p className={`text-xs text-primary bg-primary/[0.15] h-fit py-1 px-2`}>{request.type}</p>
                <span className={`h-6 w-[2px] bg-grey`}></span>
                <p className={`text-xs font-light`}>Du {format(parse(request.startDate, 'dd/MM/yyyy', new Date(), { locale: fr }), 'dd/MM/yyyy')} au {format(parse(request.endDate, 'dd/MM/yyyy', new Date(), { locale: fr }), 'dd/MM/yyyy')} ({calculateDuration(request.startDate, request.endDate)})</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LastRequests;