import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './offerCreationStepDescription.css';

const OfferCreationStepDescription = ({ formData, setFormData }) => {
    const ckeditorCharLimit = 500;

    const [charCountAbout, setCharCountAbout] = useState(formData.offerAbout.length);
    const [charCountMission, setCharCountMission] = useState(formData.offerMission.length);
    const [charCountRequiredProfile, setCharCountRequiredProfile] = useState(formData.offerRequiredProfile.length);

    const handleChange = (event, editor, field) => {
        const data = editor.getData();        
        setFormData(prevData => ({
            ...prevData,
            [field]: data
        }));
    
        switch (field) {
            case 'offerAbout':
                setCharCountAbout(data.length);
                break;
            case 'offerMission':
                setCharCountMission(data.length);
                break;
            case 'offerRequiredProfile':
                setCharCountRequiredProfile(data.length);
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex flex-col items-stretch w-auto gap-3">
            <div className="border-b border-borderGrey ml-2"></div>

            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3">
                    <label>A Propos</label>
                    <p className="text-[#7C8493] font-light">Texte d'introduction qui résume l'offre</p>
                </div>
                <div className="w-7/12 flex flex-col gap-3">
                    <CKEditor
                        editor={ClassicEditor}
                        data={formData.offerAbout}
                        onChange={(event, editor) => handleChange(event, editor, 'offerAbout')}
                        config={{
                            placeholder: 'Saisissez votre texte ici',
                            toolbar: {
                                items: [
                                    'bold', 'italic', 'bulletedList', 'numberedList', 'link'
                                ]
                            },
                        }}
                        
                    />
                    <div className="flex flex-row justify-between items-center flex-nowrap">
                        <p className="text-[#7C8493] font-light">Maximum {ckeditorCharLimit} caractères</p>
                        <p className="font-light">{charCountAbout}/{ckeditorCharLimit}</p>
                    </div>
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>

            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3">
                    <label>Mission</label>
                    <p className="text-[#7C8493] font-light">Décrivez les tâches, missions et responsabilités qui seront confiées au candidat</p>
                </div>
                <div className="w-7/12 flex flex-col gap-3">
                    <CKEditor
                        editor={ClassicEditor}
                        data={formData.offerMission}
                        onChange={(event, editor) => handleChange(event, editor, 'offerMission')}
                        config={{
                            placeholder: 'Saisissez votre texte ici',
                            toolbar: {
                                items: [
                                    'bold', 'italic', 'bulletedList', 'numberedList', 'link'
                                ]
                            },
                        }}
                    />
                    <div className="flex flex-row justify-between items-center flex-nowrap">
                        <p className="text-[#7C8493] font-light">Maximum {ckeditorCharLimit} caractères</p>
                        <p className="font-light">{charCountMission}/{ckeditorCharLimit}</p>
                    </div>
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>

            <div className="flex flex-row gap-10 my-6">
                <div className="w-4/12 flex flex-col gap-3">
                    <label>Profil Recherché</label>
                    <p className="text-[#7C8493] font-light">Décrivez les qualités du candidat idéal en termes de savoir-faire et de savoir-être.</p>
                </div>
                <div className="w-7/12 flex flex-col gap-3">
                    <CKEditor
                        editor={ClassicEditor}
                        data={formData.offerRequiredProfile}
                        onChange={(event, editor) => handleChange(event, editor, 'offerRequiredProfile')}
                        config={{
                            placeholder: 'Saisissez votre texte ici',
                            toolbar: {
                                items: [
                                    'bold', 'italic', 'bulletedList', 'numberedList', 'link'
                                ]
                            },
                        }}
                    />
                    <div className="flex flex-row justify-between items-center flex-nowrap">
                        <p className="text-[#7C8493] font-light">Maximum {ckeditorCharLimit} caractères</p>
                        <p className="font-light">{charCountRequiredProfile}/{ckeditorCharLimit}</p>
                    </div>
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
        </div>
    );
};

export default OfferCreationStepDescription;
