import React, {useRef} from "react";
import SelectInput from "../utils/selectInput.jsx";
import Input from "../utils/input.jsx";
import {number} from "prop-types";
import Checkbox from "../utils/checkbox.jsx";

function IdentityForm() {
  const genderRef = useRef(null);
  const firstnameRef = useRef(null);
  const nameRef = useRef(null);
  const birthDayRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const emailRef = useRef(null);
  const confirmEmailRef = useRef(null);
  const addressRef = useRef(null);
  const secondAddressRef = useRef(null);
  const postalCodeRef = useRef(null);
  const cityRef = useRef(null);
  const personalWebsiteRef = useRef(null);
  const linkedinRef = useRef(null);
  const drivingLicenceRef = useRef(false);
  const disabilityRef = useRef(false);
  const genders = ['Homme', 'Femme', 'Autre']
  return (
    <div className="">
      <div className="space-y-6 ">

        <h3 className="text-2xl">Vous êtes</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between space-y-6 sm:space-y-0">
          <SelectInput options={genders} name="gender" label="Genre" required={true} inputRef={genderRef} />
          <Input type="text" name="firstname" label="Prénom" size="1/3" required={true} inputRef={firstnameRef} />
          <Input type="text" name="lastname" label="Nom" size="1/3" required={true} inputRef={nameRef} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input type="date" name="birthDay" label="Date de naissance" size="1/2" required={true} inputRef={birthDayRef} />
          <Input type="tel" name="birthDay" label="Numéro de téléphone" max={10} size="1/2" required={true} inputRef={phoneNumberRef} />
          <Input type="email" name="email" label="Email" size="1/2" required={true} inputRef={emailRef} />
          <Input type="email" name="emailConfirm" label="Confirmer votre email" size="1/2" required={true} inputRef={confirmEmailRef} />
          <Input type="text" name="address" label="Adresse" size="1/2" required={false} inputRef={addressRef} />
          <Input type="text" name="secondAddress" label="Complement d'adresse" size="1/2" required={false} inputRef={secondAddressRef} />
          <Input type="number" name="postalCode" label="Code postal" max={5} size="1/2" required={false} inputRef={postalCodeRef} />
          <Input type="text" name="city" label="Ville" size="1/2" required={false} inputRef={cityRef} />
        </div>
        <Input type="text" name="personalWebsite" required={false} size="full" label="Adresse de votre site web personnel" inputRef={personalWebsiteRef} />
        <Input type="text" name="linkedin" required={false} size="full" label="Lien vers votre page Linkedin" inputRef={linkedinRef} />
        <div className="flex space-x-8">
          <Checkbox name="drivingLicence" label="J'ai le permis de conduire" inputRef={drivingLicenceRef}/>
          <Checkbox name="disability" label="J'ai une forme d'handicap" inputRef={disabilityRef}/>
        </div>
      </div>
    </div>
  )
}

export default IdentityForm