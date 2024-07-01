import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import { FaPlus } from "react-icons/fa";
import { HiOutlineXMark } from "react-icons/hi2";


const OfferCreationStepType = ({ formData, setFormData }) => {
    const [tags, setTags] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    useMemo(() => {
        const getTags = async () => {
            let url = `${import.meta.env.VITE_BACK_ENDPOINT}tags`;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setTags(data);
            } catch (err) {
                console.error('Error fetching data: ', err);
            }
        };
        getTags();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleTagChange = (selectedOptions) => {
        const selectedTags = selectedOptions.map((option) => option.value);
        setFormData((prevData) => ({
            ...prevData,
            offerProfiles: selectedTags,
        }));
    };

    const formatOptionLabel = ({ label, color }) => (
        <div className="flex items-center" style={{ color: color }}>
            {label}
        </div>
    );

    const handleSkillChange = (e) => {
        setNewSkill(e.target.value);
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !formData.offerSkills.includes(newSkill)) {
            setFormData((prevData) => ({
                ...prevData,
                offerSkills: [...prevData.offerSkills, newSkill],
            }));
            setNewSkill('');
        }
    };

    const handleDeleteSkill = (skillToDelete) => {
        setFormData((prevData) => ({
            ...prevData,
            offerSkills: prevData.offerSkills.filter((skill) => skill !== skillToDelete),
        }));
    };

    return (
        <div className="flex flex-col items-stretch w-auto gap-3">
            <div className="border-b border-borderGrey ml-2"></div>
            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3">
                    <label htmlFor="offerName">Nom de l'offre</label>
                    <p className="text-[#7C8493] font-light">Décrivez le nom de l'offre de stage ou d'alternance</p>
                </div>
                <div className="w-7/12">
                    <input
                        type="text"
                        name="offerName"
                        value={formData.offerName}
                        placeholder="ex: Assistant Marketing"
                        onChange={handleChange}
                        className="border border-borderGrey p-5 w-8/12 font-normal"
                    />
                    <p className="text-[#7C8493] font-light mt-3">Au moins 50 caractères</p>
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex">
                    <label>Type d'offre</label>
                </div>
                <div className="w-7/12 flex flex-col gap-5">
                    <div className="">
                        <label htmlFor="offerType">
                            <input
                                id="stage"
                                name="offerType"
                                type="radio"
                                value="internship"
                                checked={formData.offerType === 'internship'}
                                onChange={handleChange}
                            />
                            <p className="font-normal">Stage</p>
                        </label>
                    </div>
                    <div className="">
                        <label htmlFor="offerType">
                            <input
                                id="alternance"
                                name="offerType"
                                type="radio"
                                value="apprenticeship"
                                checked={formData.offerType === 'apprenticeship'}
                                onChange={handleChange}
                            />
                            <p className="font-normal">Alternance</p>
                        </label>
                    </div>
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12">
                    <label htmlFor="offerPay">Rémunération</label>
                </div>
                <div className="w-7/12">
                    <input
                        type="text"
                        name="offerPay"
                        value={formData.offerPay}
                        onChange={handleChange}
                        placeholder="Montant par mois"
                        className="border border-borderGrey p-5 w-8/12 font-normal"
                    />
                    <p className="text-[#7C8493] font-light mt-3">575 € par mois minimum pour les stages de plus de 2 mois</p>
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3">
                    <label htmlFor="offerProfiles">Profils métiers</label>
                    <p className="text-[#7C8493] font-light">Ajoutez les métiers recherchés</p>
                </div>
                <div className="w-7/12">
                    <Select
                        isMulti
                        name="offerProfiles"
                        options={tags.map((tag) => ({
                            value: tag.id,
                            label: tag.name,
                            color: tag.color,
                        }))}
                        value={formData.offerProfiles.map((profileId) => ({
                            value: profileId,
                            label: tags.find((tag) => tag.id === profileId)?.name || '',
                            color: tags.find((tag) => tag.id === profileId)?.color || '#000',
                        }))}
                        onChange={handleTagChange}
                        formatOptionLabel={formatOptionLabel}
                        className="basic-multi-select w-8/12"
                        classNamePrefix="select"
                    />
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3">
                    <label htmlFor="offerSkills">Compétences</label>
                    <p className="text-[#7C8493] font-light">Ajoutez les compétences recherchées</p>
                </div>
                <div className="w-7/12 flex flex-col gap-3">
                    <div className="flex flex-row items-center gap-3">
                        <input
                            type="text"
                            name="newSkill"
                            value={newSkill}
                            onChange={handleSkillChange}
                            placeholder="Ajouter une compétence"
                            className="border border-[#CCCCF5] text-primary p-5 w-6/12 font-normal"
                        />
                        <button
                            type="button"
                            onClick={handleAddSkill}
                            className="border border-[##CCCCF5] text-primary px-8 w-auto py-5 rounded flex flex-row items-center gap-3"
                        >
                            <FaPlus/> Ajouter
                        </button>
                    </div>
                    <div className="flex flex-row flex-wrap gap-2 mt-3">
                        {formData.offerSkills.map((skill, index) => (
                            <div key={index} className="flex flex-row justify-between items-center bg-lightGrey p-2 rounded text-primary">
                                <span>{skill}</span>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteSkill(skill)}
                                    className="text-xl pb-0.5"
                                >
                                    <HiOutlineXMark/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
        </div>
    );
};

export default OfferCreationStepType;
