import React from "react";
import style from "./Single.module.css";

const SingleMessage = ({ user }) => {
  return <div className={style.wrapper}>{user.username}</div>;
};

export default SingleMessage;
