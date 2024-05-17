import React from "react";

import LinkTo from "../utils/linkTo.jsx";
import {useNavigate} from "react-router-dom";

function WorkSector() {
  const navigate = useNavigate();
  const data = [
    {
      title: 'Communication',
      type: 'Stage',
      compagny: 'Google',
      location: 'Paris',
      description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      tags: [{name: 'Marketting', color: '#FFB836'}, {name: 'Design', color: '#56CDAD'}],
    },
    {
      title: 'Commercial',
      type: 'Stage',
      compagny: 'Google',
      location: 'Paris',
      description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      tags: [{name: 'Marketting', color: '#FFB836'}, {name: 'Design', color: '#56CDAD'}],
    },
    {
      title: 'Marketing',
      type: 'Stage',
      compagny: 'Google',
      location: 'Paris',
      description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      tags: [{name: 'Marketting', color: '#FFB836'}, {name: 'Design', color: '#56CDAD'}],
    },
    {
      title: 'Finance',
      type: 'Alternance',
      compagny: 'Google',
      location: 'Paris',
      description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      tags: [{name: 'Marketting', color: '#FFB836'}, {name: 'Design', color: '#56CDAD'}],
    },
    {
      title: 'Informatique',
      type: 'Stage',
      compagny: 'Google',
      location: 'Paris',
      description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      tags: [{name: 'Marketting', color: '#FFB836'}, {name: 'Design', color: '#56CDAD'}],
    },
    {
      title: 'Management',
      type: 'Alternance',
      compagny: 'Google',
      location: 'Paris',
      description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      tags: [{name: 'Marketting', color: '#FFB836'}, {name: 'Design', color: '#56CDAD'}],
    },
    {
      title: 'Industrie',
      type: 'Stage',
      compagny: 'Google',
      location: 'Paris',
      description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      tags: [{name: 'Marketting', color: '#FFB836'}, {name: 'Design', color: '#56CDAD'}],
    },
    {
      title: 'Business',
      type: 'Stage',
      compagny: 'Google',
      location: 'Paris',
      description: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud',
      tags: [{name: 'Marketting', color: '#FFB836'}, {name: 'Design', color: '#56CDAD'}],
    },
  ]
  return (
    <div className="space-y-5 md:space-y-10">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:justify-between items-start md:items-end">
        <h2 className="xl:text-5xl lg:text-4xl text-3xl">Dernières <span className="text-secondary">offres</span></h2>
        <LinkTo text={'Toutes les offres'} color={'secondary'} page={''} />
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {data.map((offer) => (
          <div onClick={() => navigate("/")} className="group flex flex-col items-center xs:items-start px-4 xs:w-[33vw] md:w-[25vw] lg:w-[20vw] py-5 border border-grey space-y-4 transition-all cursor-pointer">
            {/*<i className={`${category.icon}`}></i>*/}
            <div className={`flex flex-row justify-between w-full`}>
              <div className="w-12 h-12 rounded-full bg-third "></div>
              <p className={`text-sm text-primary bg-primary/[0.15] h-fit py-1 px-2`}>{offer.type}</p>
            </div>
            <p className="">{offer.title}</p>
            <div className={`text-grey flex flex-row items-center space-x-2`}>
              <p className={`text-sm font-light`}>{offer.compagny}</p>
              <span className={`h-2 w-2 bg-grey rounded-full`}></span>
              <p className={`text-sm font-light`}>{offer.location}</p>
            </div>
            <p className={`text-sm text-grey font-light`}>{offer.description.length > 40 ? `${offer.description.substring(0, 40)}...` : offer.description}</p>
            <div className={`flex flex-row justify-center space-x-4`}>
              {offer.tags.map((tag) => (
                <div className={`rounded-xl`} style={{ backgroundColor: `${tag.color}1A` }}>
                  <p className={`text-center text-xs py-1 px-2  font-light`} style={{ color: tag.color }}>{tag.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}

export default WorkSector