import React from "react";
import styles from "./storyeditor.module.css";
import Topmenu from "../topmenu/topmenu";
const StoryEditor = () => {
  return (
    <>
      <Topmenu />
      <div className={styles.storyEditor}>
        <div className={styles.leftmenu}>
          <div className={styles.bottom}>
            <h1 className={styles.title}>Your Story</h1>
            <div className={styles.profileImage}></div>
          </div>
        </div>
        <div className={styles.maincontent}>
          <div className={styles.uploadimage}>Create a Photo story</div>
          <div className={styles.addtext}>Create a Text Story</div>
        </div>
      </div>
    </>
  );
};

export default StoryEditor;
