import React, { useState } from 'react';
import {FaXmark} from "react-icons/fa6";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(file);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    document.getElementById('file-input').value = '';
  };

  return (
    <div className="flex items-center space-x-2">
      <img src={preview !==  null ? `${preview}` : '/placeholder.webp'} alt="Preview" className="w-20 h-20 rounded-full object-cover" />
      <input
        className="hidden"
        id="file-input"
        type="file"
        accept="image/png, image/jpeg"
        name="profilePic"
        onChange={handleFileChange}

      />
      <label htmlFor="file-input" className="bg-fourth/50 flex flex-col justify-center items-center text-center cursor-pointer px-10 border-2 border-primary border-dashed rounded text-primary">
        <p>Importer</p>
        <p className="text-grey">JPG ou PNG (5 Mo max)</p>
      </label>

      {preview &&(
        <button onClick={handleRemoveFile} className="flex items-center font-bold text-dark h-fit rounded bg-grey/50 cursor-pointer">
          <FaXmark className="w-7 h-7"/>
        </button>
      )}
    </div>
  );
};

export default FileUploader;
