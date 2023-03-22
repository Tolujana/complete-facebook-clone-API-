import React, { useContext, useState } from "react";
import style from "./sharePopup.module.css";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../proxySettings";
import DisplayData from "./DisplayData";

const PublicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

const SharePopup = () => {
  const { user, dispatch, modalType } = useContext(AuthContext);
  const [isDragActive, setDragActive] = useState(false);
  const [isDropped, setDropActive] = useState(false);
  const [error, setError] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const uploadMedia = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
    if (event.type === "drop") {
      handleFiles(event.dataTransfer.files, true);
      setDropActive(true);
    }
  };
  const checkFileIsValid = (files) => {
    const check = !Object.values(files).some((file) => {
      const { type } = file;

      return !/mp4|jpg|jpeg|gif|png/.test(type);
    });
    return check;
  };

  const uploadData = async (data) => {
    try {
      const response = await axiosInstance.post("/upload", data);
      console.log(response.status);
    } catch (error) {}
  };

  const handleFiles = (files, fromDragnDrop = false) => {
    console.log(files);
    if (fromDragnDrop && !checkFileIsValid(files))
      setError("file/file(s)  not an image");

    const data = new FormData();
    const filesArray = Object.values(files);

    filesArray.forEach((file) => {
      const fileName = Date.now() + file.name;

      console.log(file);
      data.append("files", file);
      data.append("name", fileName);
    });
    //   uploadData(data);
    setDisplayData(filesArray);
  };

  return (
    <div className={style.shareContainer}>
      <div className={style.title}>Create Post</div>
      <div className={style.shareWrapper}>
        <div className={style.userInfo}>
          <img
            src={
              !user.profilePicture
                ? PublicFolder + "/noimage.png"
                : PublicFolder + "/" + user.profilePicture
            }
            alt=""
            className={style.shareImage}
          />
          <div className={style.details}>
            <div className={style.name}>
              {user?.username?.charAt(0).toUpperCase() +
                user?.username?.slice(1)}
            </div>
            <select name="" id="" className="postType">
              <option value="" selected>
                Public
              </option>
              <option value="">private</option>
            </select>
          </div>
        </div>
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
          />
        </div>
        <div className={style.photoUpload}>
          {isDragActive && (
            <div
              className={style.dragElement}
              onDragEnter={uploadMedia}
              onDrop={uploadMedia}
              onDragOver={uploadMedia}
              onDragLeave={uploadMedia}
            ></div>
          )}
          {isDropped && (
            <div className={style.display}>
              <DisplayData data={displayData} />
            </div>
          )}
          <div
            className={`${style.drag} ${isDragActive ? style.white : ""}`}
            onDragEnter={uploadMedia}
          >
            <label className={style.label} htmlFor="fileInput"></label>
            <input
              type="file"
              name="files"
              id="fileInput"
              accept="image/png, image/gif, image/jpeg,video/mp4"
              className={style.fileUpload}
              multiple
              onChange={(e) => {
                handleFiles(e.target.files);
              }}
            />
          </div>
        </div>
        <div className={style.actionButtons}></div>
        <button className={style.post}></button>
      </div>
    </div>
  );
};

export default SharePopup;
