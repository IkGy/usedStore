// preview.js

import { FaTimes } from "react-icons/fa";
import React from "react";
import './preview.css';

function Preview({ selectedFiles, deleteImage }) {
  return (
    <div className="file-previews-container">
      {selectedFiles.map((preview, index) => (
        <div key={index} className="file-previews">
          {
            preview.type && preview.type.startsWith('image/') ? (
              <img src={URL.createObjectURL(preview)} alt={`File Preview ${index + 1}`} />
              ) : (
                <span>{preview.name}</span>
              )
          }
          <button
            type="button"
            className="cancel-button"
            onClick={() => deleteImage(index)}
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Preview;
