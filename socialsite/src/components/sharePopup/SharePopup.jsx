import React, { useContext, useRef, useState } from "react";
import style from "./sharePopup.module.css";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../proxySettings";
import DisplayData from "../display/DisplayData";
import { handleFiles, processDragNDrop, uploadData } from "../../utils/generalServices";

const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
const NOIMAGE = process.env.REACT_APP_NO_IMAGE;
const SharePopup = () => {
  const { user } = useContext(AuthContext);
  const [isDragActive, setDragActive] = useState(false);
  const [isDropped, setDropActive] = useState(false);
  const [error, setError] = useState("");
  const userInput = useRef();
  const [displayData, setDisplayData] = useState([]);
  const [uploadFiles, setUploadFiles] = useState(null);
  const [fileNames, setFileNames] = useState(null);
  const [input, setInput] = useState("");
  const designType = ["row", "column"]; //this is for css style
  const randomNumber = Math.floor(Math.random() * 2);
  const classNameOptions = ["one", "two", "three", "four"]; // this is for CSS styles
  const design = designType[randomNumber];
  const numberOfFiles = displayData.length;
  const designPattern =
    numberOfFiles < 5
      ? ` ${design} ${classNameOptions[numberOfFiles - 1]} `
      : ` ${design} multiple`;

  const newPost = {
    userId: user._id,
    desc: userInput?.current?.value,
    files: fileNames,
    cssName: `post ${designPattern}`,
  };

  const handleFileUpload = (event) => {
    const dropActive = event.type === "drop" ? true : false;
    const files = dropActive ? event.dataTransfer.files : event.target.files;
    const [fileNames, data, filesArray, errorMessage] = handleFiles(files, dropActive);
    console.log(event);
    setFileNames(fileNames);
    setUploadFiles(data);
    setDisplayData(filesArray);
    setError(errorMessage);
  };

  return (
    <div className={style.shareContainer}>
      <div className={style.title}>Create Post</div>
      <div className={style.shareWrapper}>
        <div className={style.userInfo}>
          <img
            src={!user.profilePicture ? NOIMAGE : PublicFolder + "/" + user.profilePicture}
            alt=""
            className={style.shareImage}
          />
          <div className={style.details}>
            <div className={style.name}>
              {user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}
            </div>
            <select name="" id="" className="postType">
              <option value="" selected>
                Public
              </option>
              <option value="">private</option>
            </select>
          </div>
        </div>
        <div className={style.postContent}>
          <div className={style.inputbox}>
            <input
              type="text"
              placeholder={
                "What's on your mind " +
                user?.username?.charAt(0).toUpperCase() +
                user?.username?.slice(1) +
                "?"
              }
              className={style.input}
              // value={input}
              ref={userInput}
              // onchange={setUserInput}
            />
          </div>
          <div className={style.photoUpload}>
            {isDragActive && (
              <div
                className={style.dragElement}
                onDragEnter={(e) => {
                  processDragNDrop(e, setDragActive, handleFileUpload);
                }}
                onDrop={(e) => {
                  processDragNDrop(e, setDragActive, handleFileUpload);
                }}
                onDragOver={(e) => {
                  processDragNDrop(e, setDragActive, handleFileUpload);
                }}
                onDragLeave={(e) => {
                  processDragNDrop(e, setDragActive, handleFileUpload);
                }}
              ></div>
            )}
            {(isDropped || numberOfFiles > 0) && (
              <div className={style.display}>
                <DisplayData files={displayData} cssName={designPattern} />
              </div>
            )}
            {!isDropped && (
              <div
                className={`${style.drag} ${isDragActive ? style.white : ""}`}
                onDragEnter={(e) => {
                  processDragNDrop(e, setDragActive, handleFileUpload);
                }}
              >
                {numberOfFiles == 0 && (
                  <label className={style.label} htmlFor="fileInput">
                    <span className={style.labelText}>Drag & Drop photos or Click to upload</span>
                  </label>
                )}
                <input
                  type="file"
                  name="files"
                  id="fileInput"
                  accept="image/png, image/gif, image/jpeg,video/mp4"
                  className={style.fileUpload}
                  multiple
                  onChange={handleFileUpload}
                />
              </div>
            )}
          </div>
        </div>
        <div className={style.actionButtons}></div>
        <button
          className={style.post}
          onClick={(e) => {
            uploadData("posts", uploadFiles, newPost);
          }}
        >
          {" "}
          Post{" "}
        </button>
      </div>
    </div>
  );
};

export default SharePopup;
