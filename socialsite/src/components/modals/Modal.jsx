import React, { useContext } from "react";
import styles from "./modal.module.css";
import SharePopup from "../sharePopup/SharePopup";
import CommentPopup from "../commentPopup/CommentPopup";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/AuthContext";
import { openPopupDialog } from "../../utils/generalServices";

const Modal = ({ payload }) => {
  const { dispatch } = useContext(AuthContext);

  const action = { type: "MODAL_TYPE", payload: "" };
  const getComponentToDisplay = (payload) => {
    switch (payload.name) {
      case "register":
        return <div className={styles.fullScreenModal}></div>;
      case "share":
        return <SharePopup />;
      case "edit profile":
        return <div>EDit profile</div>;
      case "comment":
        return (
          <CommentPopup post={payload.post} user={payload.user} commentList={payload.commentList} />
        );
      default:
        return "";
    }
  };

  const Component = getComponentToDisplay(payload);
  const disableModal = () => {
    openPopupDialog(action, dispatch);
  };
  return (
    <>
      {payload !== "" && (
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
