import React, {useRef} from "react";
import SelectInput from "../utils/selectInput.jsx";
import Input from "../utils/input.jsx";
import RichText from "../utils/richText.jsx";

function GraduationForm() {

  const studyLevels = [
    'Bac -2',
    'Bac -1',
    'Baccalauréat',
    'Bac +1',
    'Bac +2',
    'Bac +3',
    'Bac +4',
    'Bac +5',
    'Bac +6',
    'Bac +7',
  ]
  const diplomaLevels = [
    "Bac",
    "BTS",
    "Licence",
    "Master",
    "Doctorat",
    "Autre"
  ];

  const studyLevelRef = useRef(null);
  const preparedDiplomaRef = useRef(null);
  const schoolNameRef = useRef(null);
  const studiesName = useRef(null);
  return (
    <div className="space-y-6">
      <h3 className="text-2xl">Votre situation actuelle</h3>
      <div className="flex flex-col sm:flex-row sm:justify-between space-y-6 sm:space-y-0">
        <SelectInput inputRef={studyLevelRef} name="studyLevel" required={true} label="Niveau d'études" options={studyLevels} />
        <SelectInput inputRef={preparedDiplomaRef} name="preparedDiploma" required={true} label="Diplôme préparé" options={diplomaLevels} />
        <Input inputRef={schoolNameRef} name="schoolName" label="Nom de l'établissement" type="text" required={true} />
      </div>
      <Input name="studiesName" label="Nom de la formation préparée" type="text" required={true} inputRef={studiesName} />
      <RichText label="Vos atouts & motivations pour postuler à cette offre de stage" />
    </div>
  )
}

export default GraduationForm