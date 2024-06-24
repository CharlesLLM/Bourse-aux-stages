import {useEffect, useState} from "react";
import LinkTo from "../utils/linkTo.jsx";
import {Link} from "react-router-dom";
import {differenceInDays, differenceInMonths, differenceInYears, format, parseISO} from 'date-fns';
// import {fr} from "date-fns/locale/fr";
import PrimaryTag from "../utils/primaryTag.jsx";

function LastRequests() {
  const [requests, setRequests] = useState([]);

  useEffect( () => {
    const latestRequests = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_ENDPOINT}request/latest`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRequests(data);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    latestRequests();
  }, []);

  const calculateDuration = (start, end) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    const daysDifference = differenceInDays(endDate, startDate);

    if (daysDifference < 31) {
      return `${daysDifference} jours`;
    } else {
      const monthsDifference = differenceInMonths(endDate, startDate);
      return `${monthsDifference} mois`;
    }
  };

  const calculateAge = (birthDateString) => {
    return differenceInYears(new Date(), parseISO(birthDateString));
  }

  if (requests && requests.length > 0) {
    return (
      <div className="space-y-5 md:space-y-10 bg-lightGrey w-full px-32 py-[72px]"
           style={{clipPath: "polygon(10% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 5%)"}}
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between items-start md:items-end">
          <h2 className="xl:text-5xl lg:text-4xl text-3xl">Dernières <span className="text-secondary">demandes</span></h2>
          <LinkTo text={'Tous les profils'} color={'secondary'} page={''} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {requests.map((request) => (
            <Link to="/" key={request.id} className="group flex flex-col md:flex-row gap-6 bg-white px-6 lg:px-8 xl:px-10 py-6 cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-third"></div>
              <div className={`flex flex-col gap-2`}>
                <p className="text-xl font-semibold">{request.name}</p>
                <div className={`text-grey flex items-center gap-2`}>
                  <p className={`text-textGrey font-normal`}>{request.student.user.firstName} {request.student.user.lastName} ({calculateAge(request.student.user.birthDate)} ans)</p>
                  <span className={`h-1 w-1 bg-textGrey rounded-full`}></span>
                  <p className={`text-textGrey font-normal`}>{request.student.city}</p>
                </div>
                <div className={`text-grey flex items-center gap-2`}>
                  <PrimaryTag text={request.type} />
                  <span className={`h-6 w-[1px] bg-borderGrey`}></span>
                  <p className={`font-normal text-textGrey`}>Du {format(parseISO(request.startDate), 'dd/MM/yyyy')} au {format(parseISO(request.endDate), 'dd/MM/yyyy')} ({calculateDuration(request.startDate, request.endDate)})</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p className="text-primary text-2xl">Aucune demande disponible pour le moment.</p>
      </div>
    )
  }
}

export default LastRequests;
