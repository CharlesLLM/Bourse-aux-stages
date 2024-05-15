import React from "react";
import LinkTo from "../utils/linkTo.jsx";
import {useNavigate} from "react-router-dom";

function WorkSector() {
  const navigate = useNavigate();
  const data = [
    {
      icon: 'fa-solid fa-pen',
      title: 'Communication',
      number: 235,
    },
    {
      icon: 'fa-solid fa-chart-simple',
      title: 'Commercial',
      number: 130,
    },
    {
      icon: 'fa-solid fa-pen',
      title: 'Marketing',
      number: 235,
    },
    {
      icon: 'fa-solid fa-pen',
      title: 'Finance',
      number: 235,
    },
    {
      icon: 'fa-solid fa-pen',
      title: 'Informatique',
      number: 235,
    },
    {
      icon: 'fa-solid fa-pen',
      title: 'Management',
      number: 235,
    },
    {
      icon: 'fa-solid fa-pen',
      title: 'Industrie',
      number: 235,
    },
    {
      icon: 'fa-solid fa-pen',
      title: 'Business',
      number: 235,
    },
  ]
  return (
    <div className="space-y-5 md:space-y-10">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between items-start md:items-end">
        <h2 className="xl:text-5xl lg:text-4xl text-3xl">Top des <span className="text-secondary">profils recherchés</span></h2>
        <LinkTo text={'Tous les profils'} color={'secondary'} page={''} />
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {data.map((category) => (
          <div onClick={() => navigate("/")} className="group flex flex-col items-center xs:items-start px-4 py-5 border border-grey space-y-8 transition-all cursor-pointer hover:bg-primary">
            {/*<i className={`${category.icon}`}></i>*/}
            <div className="w-12 h-12 rounded-full bg-third group-hover:bg-white"></div>
            <p className="uppercase group-hover:text-white lg:text-lg xl:text-xl font-bold">{category.title}</p>
            <p className="text-grey text-sm group-hover:text-white">{category.number} offres <i className="fa-solid fa-arrow-right"></i></p>
          </div>
        ))}
      </div>
    </div>

  )
}

export default WorkSector