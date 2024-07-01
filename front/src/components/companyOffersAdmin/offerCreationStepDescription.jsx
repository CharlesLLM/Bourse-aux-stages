import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Link, WordCount, List, SpecialCharacters, SpecialCharactersEssentials } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import './offerCreationStepDescription.css';

const OfferCreationStepDescription = ({ formData, setFormData }) => {
    const ckeditorCharLimit = 500;

    const handleChange = (event, editor, field) => {
        const wordCountPlugin = editor.plugins.get( 'WordCount' );
        const data = editor.getData();
        setFormData(prevData => ({
            ...prevData,
            [field]: data
        }));
        switch (field){
            case "offerAbout":
                setFormData(prevData => ({
                    ...prevData,
                    charCountAbout: wordCountPlugin.characters
                }));
                break;
            case "offerMission":
                setFormData(prevData => ({
                    ...prevData,
                    charCountMission: wordCountPlugin.characters
                }));                break;
            case "offerRequiredProfile":
                setFormData(prevData => ({
                    ...prevData,
                    charCountRequiredProfile: wordCountPlugin.characters
                }));                break;
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
                        editor={ ClassicEditor }
                        config={ {
                            toolbar: {
                                items: [ 'undo', 'redo', 'bold', 'italic', 'link','bulletedList', 'numberedList', 'specialCharacters' ],
                            },
                            plugins: [
                                Bold, Essentials, Italic, Mention, Paragraph, Undo, Link, WordCount, List, SpecialCharacters, SpecialCharactersEssentials
                            ],
                        } }
                        data={formData.offerAbout}
                        onChange={(event, editor) => handleChange(event, editor, 'offerAbout')}
                    />
                    <div className="flex flex-row justify-between items-center flex-nowrap">
                        <p className="text-[#7C8493] font-light">Maximum {ckeditorCharLimit} caractères</p>
                        <p className="font-light"><span className={`font-light ${formData.charCountAbout > ckeditorCharLimit ? 'text-red-600' : ''}`}>{formData.charCountAbout}</span>/{ckeditorCharLimit}</p>
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
                        editor={ ClassicEditor }
                        config={ {
                            toolbar: {
                                items: [ 'undo', 'redo', 'bold', 'italic', 'link','bulletedList', 'numberedList', 'specialCharacters' ],
                            },
                            plugins: [
                                Bold, Essentials, Italic, Mention, Paragraph, Undo, Link, WordCount, List, SpecialCharacters, SpecialCharactersEssentials
                            ],
                        } }
                        data={formData.offerMission}
                        onChange={(event, editor) => handleChange(event, editor, 'offerMission')}
                    />
                    <div className="flex flex-row justify-between items-center flex-nowrap">
                        <p className="text-[#7C8493] font-light">Maximum {ckeditorCharLimit} caractères</p>
                        <p className="font-light"><span className={`font-light ${formData.charCountMission > ckeditorCharLimit ? 'text-red-600' : ''}`}>{formData.charCountMission}</span>/{ckeditorCharLimit}</p>
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
                        editor={ ClassicEditor }
                        config={ {
                            toolbar: {
                                items: [ 'undo', 'redo', 'bold', 'italic', 'link','bulletedList', 'numberedList', 'specialCharacters' ],
                            },
                            plugins: [
                                Bold, Essentials, Italic, Mention, Paragraph, Undo, Link, WordCount, List, SpecialCharacters, SpecialCharactersEssentials
                            ],
                        } }
                        data={formData.offerRequiredProfile}
                        onChange={(event, editor) => handleChange(event, editor, 'offerRequiredProfile')}
                    />
                    <div className="flex flex-row justify-between items-center flex-nowrap">
                        <p className="text-[#7C8493] font-light">Maximum {ckeditorCharLimit} caractères</p>
                        <p className="font-light"><span className={`font-light ${formData.charCountRequiredProfile > ckeditorCharLimit ? 'text-red-600' : ''}`}>{formData.charCountRequiredProfile}</span>/{ckeditorCharLimit}</p>
                    </div>
                </div>
            </div>
            <div className="border-b border-borderGrey ml-2"></div>
        </div>
    );
};

export default OfferCreationStepDescription;
