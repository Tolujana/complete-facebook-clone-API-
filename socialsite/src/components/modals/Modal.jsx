import React from "react";
import styles from "./modal.module.css";
import SharePopup from "../sharePopup/SharePopup";

const Modal = ({ type }) => {
  return type === "register" ? (
    <div className={styles.fullScreenModal}></div>
  ) : type === "share" ? (
    <div className={styles.fullScreenModal}>
      <SharePopup />
    </div>
  ) : (
    ""
  );
};

export default Modal;
