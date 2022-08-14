import React from 'react';
import { format } from 'timeago.js';
import style from './message.module.css';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const Message = ({ message, img, createdAt, owner, ref }) => {
  return owner ? (
    <div className={style.own} ref={ref}>
      <div className={style.messageTopOwn}>
        <p className={style.messageTextOwn}>{message}</p>
        <img className={style.messageImg} src={PF + img} alt="" />
      </div>
      <div className={style.messageBottomOwn}>{format(createdAt)}</div>
    </div>
  ) : (
    <div className={style.other}>
      <div className={style.messageTop}>
        <img className={style.messageImg} src={PF + img} alt="" />
        <p className={style.messageText}>{message}</p>
      </div>
      <div className={style.messageBottom}>{format(createdAt)}</div>
    </div>
  );
};

export default Message;
