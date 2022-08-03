import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { SingleMessage } from '../messenger/Messenger';
import styles from './FriendsOnline.module.css';
const Folder = process.env.REACT_APP_PUBLIC_FOLDER;
export const FriendsOnline = ({ user }) => {
  //const [chat, setChat] = useState(false);
  const { dispatch, chats, messages } = useContext(AuthContext);

  const handleClick = () => {
    if (
      !chats?.includes(user)
      //|| messages.some((message) => message.receiverId === user._id)
    ) {
      dispatch({ type: 'CHAT_START', payload: user });
    }
  };

  return (
    <div onClick={handleClick} className={styles.FriendsOnline}>
      <div>
        <li className={styles.friendsInfo}>
          <div className={styles.profileImgContainer}>
            <img
              src={
                user.profilePicture
                  ? Folder + '/' + user.profilePicture
                  : Folder + '/noimage.png'
              }
              alt=""
              className={styles.friendsPics}
            />
            <div className={styles.online}></div>
          </div>

          <span className={styles.friendsName}>{user.username}</span>
        </li>
      </div>
    </div>
  );
};
