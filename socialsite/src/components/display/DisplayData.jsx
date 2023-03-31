import React, { useContext } from "react";
import "./display.css";
import { AuthContext } from "../../context/AuthContext";
const DisplayData = ({ files, cssName }) => {
  const EXTERNAL_FOLDER = process.env.REACT_APP_EXTERNAL_FOLDER;

  return (
    <div className={`container ${cssName}`}>
      {typeof files === "string" ? (
        <div className="image">
          <img src={EXTERNAL_FOLDER + files} alt="" className="grid-image" />
        </div>
      ) : (
        files.map((file) => {
          return (
            <div className="image">
              <img
                src={
                  cssName.includes("post")
                    ? EXTERNAL_FOLDER + file
                    : URL.createObjectURL(file)
                }
                alt=""
                className="grid-image"
              />
            </div>
          );
        })
      )}
    </div>
  );
};

export default DisplayData;
