import React, { useContext } from "react";
import styles from "./modal.module.css";
import SharePopup from "../sharePopup/SharePopup";
import CommentPopup from "../commentPopup/CommentPopup";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/AuthContext";
import { openPopupDialog } from "../../utils/generalServices";

const Modal = ({ type }) => {
  const { dispatch } = useContext(AuthContext);

  const action = { type: "MODAL_TYPE", payload: "" };
  const getComponentToDisplay = (type) => {
    switch (type.name) {
      case "register":
        return <div className={styles.fullScreenModal}></div>;
      case "share":
        return <SharePopup />;
      case "comment":
        return <CommentPopup post={type.post} user={type.user} />;
      default:
        return "";
    }
  };

  const Component = getComponentToDisplay(type);
  const disableModal = () => {
    openPopupDialog(action, dispatch);
  };
  return (
    <>
      {type !== "" && (
        <div className={styles.fullScreenModal}>
          <div className={styles.container}>
            <div className={styles.close} onClick={disableModal}>
              <CloseIcon />
            </div>
            {Component}
          </div>
        </div>
      )}
    </>
  );

  // return type === "register" ? (
  //   <div className={styles.fullScreenModal}></div>
  // ) : type === "share" ? (
  //   <div className={styles.fullScreenModal}>
  //     <SharePopup />
  //   </div>
  // ) : type === "comment" ? (
  //   <div className={styles.fullScreenModal}>
  //     <CommentPopup />
  //   </div>
  // ) : (
  //   ""
  // );
};

export default Modal;
