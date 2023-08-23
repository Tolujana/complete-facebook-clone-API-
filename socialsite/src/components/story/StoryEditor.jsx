import React, { useContext, useState } from "react";
import styles from "./storyeditor.module.css";
import Topmenu from "../topmenu/topmenu";
import { handleFiles, processDragNDrop } from "../../utils/generalServices";
import { AuthContext } from "../../context/AuthContext";

const StoryEditor = () => {
  const [isDragActive, setDragActive] = useState(false);
  const [uploadData, setUPloadData] = useState(null);
  const [files, setFiles] = useState("");
  const { user } = useContext(AuthContext);
  const handleFileUpload = (event) => {
    const dropActive = event.type === "drop" ? true : false;
    const files = dropActive ? event.dataTransfer.files : event.target.files;
    const [fileNames, data, filesArray, errorMessage] = handleFiles(files, dropActive);

    setFiles(filesArray);
    setDragActive(true);
    setUPloadData(data);
    console.log(event);
  };

  const newStory = {
    userId: user._id,
    files: files,
  };
  return (
    <>
      <Topmenu />
      <div className={styles.storyEditor}>
        <div className={styles.leftmenu}>
          <div className={styles.bottom}>
            <h1 className={styles.title}>Your Story</h1>
            <div className={styles.profileImage}></div>
          </div>
          {isDragActive && (
            <div className={styles.createStory}>
              <button className={styles.discard}>Discard</button>
              <button
                onclick={(e) => {
                  uploadData("user/story", uploadData, newStory);
                }}
                className={styles.shareStory}
              >
                Share to Story
              </button>
            </div>
          )}
        </div>
        <div className={styles.outerContainer}>
          {!isDragActive ? (
            <div className={styles.maincontent}>
              <input
                type="file"
                name="files"
                hidden
                id="fileInput"
                accept="image/png, image/gif, image/jpeg,video/mp4"
                className={styles.fileUpload}
                onChange={handleFileUpload}
              />

              <label
                htmlFor="fileInput"
                className={styles.uploadimage}
                onDrop={(e) => {
                  setDragActive(true);
                  processDragNDrop(e, setDragActive, handleFileUpload);
                }}
                onDragEnter={(e) => {
                  processDragNDrop(e, setDragActive, handleFileUpload);
                }}
                onDragOver={(e) => {
                  processDragNDrop(e, setDragActive, handleFileUpload);
                }}
                onDragLeave={(e) => {
                  processDragNDrop(e, setDragActive, handleFileUpload);
                }}
              >
                <div> Create a Photo story</div>
              </label>

              <div className={styles.addtext}>Create a Text Story</div>
            </div>
          ) : (
            <div className={styles.story}>
              <div className={styles.storyImageContainer}>
                <img src={URL.createObjectURL(files[0])} alt="" className={styles.storyImage} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StoryEditor;
