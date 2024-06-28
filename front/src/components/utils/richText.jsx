import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

function RichText({ label, setMotivation }) {
  const [value, setValue] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxLength = 500;

  useEffect(() => {
    const cleanedText = value.replace(/<[^>]*>?/gm, '');
    setCharCount(cleanedText.length);
  }, [value]);

  const handleChange = (content) => {
    setValue(content);
    setMotivation(content)
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

RichText.propTypes = {
  label: PropTypes.string,
  setMotivation: PropTypes.any,
};

export default RichText;
