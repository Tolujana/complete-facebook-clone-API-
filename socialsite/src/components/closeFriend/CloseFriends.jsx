import React from "react";
import { Link } from "react-router-dom";
import styles from "./CloseFriends.module.css";
const PF = process.env.REACT_APP_EXTERNAL_FOLDER;
const NOIMAGE = process.env.REACT_APP_NO_IMAGE;

const CloseFriends = ({ user }) => {
  return (
    <Link style={{ textDecoration: "none" }} to={"/profile/" + user.username}>
      <li className={styles.leftbarFriend}>
        <img
          src={user.profilePicture ? PF + "/" + user.profilePicture : NOIMAGE}
          alt=""
          className={styles.friendImg}
        />
        <span className={styles.friendName}>
          {" "}
          {user?.username.charAt(0).toUpperCase() + user?.username.slice(1)}
        </span>
      </li>
    </Link>
  );
};

export default CloseFriends;
