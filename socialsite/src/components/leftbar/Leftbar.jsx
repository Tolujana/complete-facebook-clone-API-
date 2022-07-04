import styles from './leftbar.module.css';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Users } from '../../dummyData';
import CloseFriends from '../closeFriend/CloseFriends';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosInstance } from '../../proxySettings';

export const LeftbarHome = () => {
  return (
    <div className={styles.leftWrapper}>
      <ul className={styles.leftmenu}>
        <li className={styles.leftListItems}>
          <GroupIcon className={styles.listICon} />
          <span className={styles.leftItems}>Friends </span>
        </li>
        <li className={styles.leftListItems}>
          <GroupsIcon className={styles.listICon} />
          <span className={styles.leftItems}>Groups</span>
        </li>
        <li className={styles.leftListItems}>
          <AddBusinessIcon className={styles.listICon} />
          <span className={styles.leftItems}>MarketPlace</span>
        </li>
        <li className={styles.leftListItems}>
          <OndemandVideoIcon className={styles.listICon} />
          <span className={styles.leftItems}>Watch</span>
        </li>
        <li className={styles.leftListItems}>
          <HistoryToggleOffIcon className={styles.listICon} />
          <span className={styles.leftItems}>Memories</span>
        </li>
      </ul>
      <button className={styles.leftbarButton}>Show more</button>
      <hr className={styles.leftbarHr} />
      <ul className={styles.leftbarFriendsList}>
        {Users.map((u) => (
          <CloseFriends key={u.id} user={u} />
        ))}
      </ul>
    </div>
  );
};

export const LeftbarProfile = ({ user }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axiosInstance.get('/users/friend/' + user._id);
        setFriends(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [user._id]);

  return (
    <div className={styles.leftWrapper}>
      <div>Profile</div>
      <ul className={styles.leftmenu}>
        <li className={styles.leftListItems}>
          <GroupIcon className={styles.listICon} />
          <span className={styles.leftItems}>Bio: {user?.desc}</span>
        </li>
        <li className={styles.leftListItems}>
          <GroupsIcon className={styles.listICon} />
          <span className={styles.leftItems}>City: {user?.city}</span>
        </li>
        <li className={styles.leftListItems}>
          <AddBusinessIcon className={styles.listICon} />
          <span className={styles.leftItems}>
            Relationship{' '}
            {user?.relationship === 1
              ? 'single'
              : user?.desc === 2
              ? 'married'
              : 'complicated'}
          </span>
        </li>
        <li className={styles.leftListItems}>
          <OndemandVideoIcon className={styles.listICon} />
          <span className={styles.leftItems}>Watch</span>
        </li>
        <li className={styles.leftListItems}>
          <HistoryToggleOffIcon className={styles.listICon} />
          <span className={styles.leftItems}>Memories</span>
        </li>
      </ul>
      <button className={styles.leftbarButton}>Show more</button>
      <hr className={styles.leftbarHr} />
      <ul className={styles.leftbarFriendsList}>
        {friends.map((u) => (
          <CloseFriends key={u._id} user={u} />
        ))}
      </ul>
    </div>
  );
};

function Leftbar({ user }) {
  return (
    <div className={styles.leftBar}>
      {user ? <LeftbarProfile user={user} /> : <LeftbarHome />}
    </div>
  );
}

export default Leftbar;
