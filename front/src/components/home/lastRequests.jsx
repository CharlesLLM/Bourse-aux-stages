import {useEffect, useState} from "react";
import LinkTo from "../utils/linkTo.jsx";
import {useNavigate} from "react-router-dom";
import {differenceInDays, differenceInMonths, differenceInYears, format, parse, parseISO} from 'date-fns';
import {fr} from "date-fns/locale/fr";

function LastRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

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
        setError(err);
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
      <div className="space-y-5 md:space-y-10 bg-lightGrey w-full p-16"
           style={{clipPath: "polygon(10% 0, 100% 0, 100% 100%, 100% 100%, 0 100%, 0 5%)"}}
      >
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between items-start md:items-end">
          <h2 className="xl:text-5xl lg:text-4xl text-3xl">Dernières <span className="text-secondary">demandes</span></h2>
          <LinkTo text={'Tous les profils'} color={'secondary'} page={''} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
          {requests.map((request) => (
            <div key={request.id} onClick={() => navigate("/")} className="group flex flex-col xs:flex-row justify-center items-center xs:items-start  w-[70vw] md:w-[40vw] py-5 border border-grey space-y-4 xs:space-y-0 xs:space-x-16 px-4 transition-all cursor-pointer">
              {/*<i className={`${category.icon}`}></i>*/}
              <div className="w-12 h-12 rounded-full bg-third"></div>
              <div className={`flex flex-col space-y-4`}>
                <p className=" lg:text-lg xl:text-xl font-bold">{request.title}</p>
                <div className={`text-grey flex flex-row items-center space-x-2`}>
                  <p className={`text-sm font-light`}>{request.student.user.firstName} ({calculateAge(request.student.user.birthDate)})</p>
                  <span className={`h-2 w-2 bg-grey rounded-full`}></span>
                  <p className={`text-sm font-light`}>{request.student.city}</p>
                </div>
                <div className={`text-grey flex flex-row items-center space-x-2`}>
                  <p className={`text-xs text-primary bg-primary/[0.15] h-fit py-1 px-2`}>{request.type}</p>
                  <span className={`h-6 w-[2px] bg-grey`}></span>
                  <p className={`text-xs font-light`}>Du {format(parseISO(request.startDate), 'dd/MM/yyyy')} au {format(parseISO(request.endDate), 'dd/MM/yyyy')} ({calculateDuration(request.startDate, request.endDate)})</p>
                </div>
              </div>
            </div>
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
