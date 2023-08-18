import React, { useContext } from "react";
import styles from "./modal.module.css";
import SharePopup from "../sharePopup/SharePopup";
import CommentPopup from "../commentPopup/CommentPopup";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/AuthContext";
import { openPopupDialog } from "../../utils/generalServices";
import DisplayData from "../display/DisplayData";

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
      case "story":
        return (
          <div className={styles.story}>
            <DisplayData files={payload.data} cssName={"story"} />
          </div>
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
};

export default Modal;
