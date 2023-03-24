import React, { useContext } from "react";
import "./display.css";
import { AuthContext } from "../../context/AuthContext";
const DisplayData = ({ files, design }) => {
  //   const { user, post } = useContext(AuthContext);
  //   const designType = ["row", "column"];
  //   const randomNumber = Math.floor(Math.random() * 2);
  //   const classNameOptions = ["one", "two", "three", "four"];
  //   const numberOfFiles = files.length;
  //   const cssName =
  //     numberOfFiles < 5 ? classNameOptions[numberOfFiles - 1] : "multiple";
  //   console.log(cssName);
  const EXTERNAL_FOLDER = process.env.REACT_APP_EXTERNAL_FOLDER;
  console.log(files);
  return (
    <div className={`container ${design}`}>
      {typeof files === "string" ? (
        <div className="image">
          <img src={EXTERNAL_FOLDER + files} alt="" className="grid-image" />
        </div>
      ) : (
        files.map((file) => {
          return (
            <div className="image">
              <img
                src={URL.createObjectURL(file) || EXTERNAL_FOLDER + file}
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
