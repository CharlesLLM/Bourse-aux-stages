import React, {useState, useMemo} from 'react';
import OfferTypeTag from "../utils/offerTypeTag";
import Select from 'react-select';

const OfferCreationStepType = ({ formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //recup tt les tags
    const [tags, setTags] = useState([]);
    console.log(tags);
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

    const handleTagChange = (selectedOptions) => {
        const selectedTags = selectedOptions.map((option) => option.value);
        setFormData((prevData) => ({
            ...prevData,
            offerProfiles: selectedTags,
        }));
    };

    const getTagLabel = (option) => (
        <div className="flex items-center" style={{ color: option.color }}>
            {option.label}
        </div>
    );

  return (
    <div className="flex flex-col items-stretch w-auto gap-3">
        <div className="border-b border-borderGrey ml-2"></div>
        <div className="flex flex-row gap-10 my-6">
            <div className="w-4/12 flex flex-col gap-3">
                <label htmfor="offerName"> 
                    Nom de l'offre
                </label>
                <p className="text-[#7C8493] font-light">
                    Décrivez le nom de l'offre de stage ou d'alternance.
                </p>
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
                <label> 
                    Type d'offre
                </label>
            </div>
            <div className="w-7/12 flex flex-col gap-5">
                <div className="checkbox">
                    <label htmlFor="offerType">
                        <input
                            id="stage"
                            name="offerType"
                            type="checkbox"
                            value="stage"
                            checked={formData.offerType === 'stage'}
                            onChange={handleChange}
                        />
                        <span className="checkbox-span"></span>
                        <p className="font-normal">Stage</p>
                    </label>
                </div>
                <div className="checkbox">
                    <label htmlFor="offerType">
                        <input
                            id="alternance"
                            name="offerType"
                            type="checkbox"
                            value="alternance"
                            checked={formData.offerType === 'alternance'}
                            onChange={handleChange}
                        />
                        <span className="checkbox-span"></span>
                        <p className="font-normal">Alternance</p>
                    </label>
                </div>
            </div>
        </div>
        <div className="border-b border-borderGrey ml-2"></div>
        <div className="flex flex-row gap-10 my-6">
            <div className="w-4/12">
                <label htmfor="offerPay"> 
                    Rémunération
                </label>
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
                <label htmfor="offerProfiles"> 
                    Profils métiers
                </label>
                <p className="text-[#7C8493] font-light">
                    Ajoutez les métiers recherchés
                </p>
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
                    getOptionLabel={getTagLabel}
                    onChange={handleTagChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                />
            </div>
        </div>
        <div className="border-b border-borderGrey ml-2"></div>
        <div className="flex flex-row gap-10 my-6">
            <div className="w-4/12 flex flex-col gap-3">
                <label htmfor="offerProfiles"> 
                    Compétences
                </label>
                <p className="text-[#7C8493] font-light">
                    Ajoutez les compétences recherchées
                </p>
            </div>
            <div className="w-7/12">
            </div>
        </div>
        <div className="border-b border-borderGrey ml-2"></div>
    </div>
  );
};

export default OfferCreationStepType;
