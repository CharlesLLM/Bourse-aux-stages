import React from 'react';
import {FaCheck} from "react-icons/fa";
import Button from "../utils/button.jsx";

function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh space-y-12">
      <FaCheck className="text-primary text-8xl"/>
      <div className="text-center w-1/2">
        <p className="text-4xl text-primary">l'utilisateur a été créé avec succès</p>
      </div>
      <Button path="/connexion" text="Se connecter" blue="true"/>
    </div>
  )
}

export default Success;