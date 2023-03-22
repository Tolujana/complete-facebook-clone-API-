import React from "react";
import styles from "./display.module.css";
const DisplayData = ({ data }) => {
  const displayStyle = "row" + data.length;
  return (
    <div className={`${styles.container} ${styles[displayStyle]}`}>
      {data.map((file) => {
        return (
          <div className={styles.image}>
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className={styles.gridImage}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayData;
