import React, {useEffect, useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function RichText({ label }) {
  const [value, setValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxLength = 500;

  useEffect(() => {
    const cleanedText = value.replace(/<[^>]*>?/gm, '');
    setCharCount(cleanedText.length);
  }, [value]);

  const handleChange = (content) => {
    setValue(content);
  };

  return (
    <div >
      <label>{label}</label>
      <div className="pb-20 xs:pb-16">
        <ReactQuill
          style={{ height: '30vh' }}
          theme="snow"
          value={value}
          onChange={handleChange}
        />
      </div>
      <div>
        {charCount}/{maxLength} caractères
      </div>
    </div>
  );
}

export default RichText;