import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CloseFriends.module.css';
const PF = process.env.REACT_APP_EXTERNAL_FOLDER;

const CloseFriends = ({ user }) => {
  return (
    <Link style={{ textDecoration: 'none' }} to={'/profile/' + user.username}>
      <li className={styles.leftbarFriend}>
        <img
          src={
            user.profilePicture
              ? PF + user.profilePicture
              : PF + 'assets/noimage.png'
          }
          alt=""
          className={styles.friendImg}
        />
        <span className={styles.friendName}> {user.username}</span>
      </li>
    </Link>
  );
};

export default CloseFriends;
