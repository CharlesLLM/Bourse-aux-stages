import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaPlus, FaTrash } from "react-icons/fa"; // Ajout de l'icône de poubelle pour la suppression
import SkillModal from "../utils/modals/skillModal.jsx";
import {FaXmark} from "react-icons/fa6";

function Skills({ title, desc }) {
  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const skillRef = useRef(null);

  const handleAddSkill = () => {
    const newSkillName = skillRef.current.value;
    if (newSkillName) {
      const newSkill = { id: uuidv4(), name: newSkillName };
      setSkills([...skills, newSkill]);
      setIsModalOpen(false);
      skillRef.current.value = "";
    }
  };

  const handleRemoveSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddSkill();
    }
  };

  return (
    <div>
      <h4 className="text-primary text-2xl ">{title}</h4>
      <p>{desc}</p>
      <div className="w-full flex flex-wrap">
      {skills.map((skill) => (
        <div key={skill.id} className="flex items-center p-1 w-fit bg-primary text-white">
          <p>{skill.name}</p>
          <button
            onClick={() => handleRemoveSkill(skill.id)}
            className="ml-2"
          >
            <FaXmark />
          </button>
        </div>
      ))}
      </div>
      {skills.length < 10 && (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-primary bg-fourth/50 flex items-center px-2 py-1"
        >
          Ajouter <FaPlus className="text-xs" />
        </button>
      )}
      {isModalOpen && (
        <SkillModal closeModal={() => setIsModalOpen(false)}>
          <h2>Ajouter une compétence</h2>
          <input
            type="text"
            placeholder="Nom de la compétence"
            className="border border-gray-400 p-2 rounded mt-2"
            ref={skillRef}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="ml-2 bg-primary text-white font-bold py-2 px-4 mt-2"
          >
            Ajouter
          </button>
        </SkillModal>
      )}
    </div>
  );
}

export default Skills;
