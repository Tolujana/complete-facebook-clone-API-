import style from './Messenger.module.css';
import { VideoCall, MoreVert, Create } from '@mui/icons-material';

import { FriendsOnline } from '../friends/FriendsOnline';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import SingleMessage from '../singlemessage/SingleMessage';
import { formLabelClasses } from '@mui/material';
import { axiosInstance } from '../../proxySettings';
const Messenger = ({ show }) => {
  const { user, chats, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_EXTERNAL_FOLDER;

  const [friends, setFriends] = useState([]);
  //const [chats, setChat] = useState([]);

  // const handleClicks = (user) => {
  //   if (!user.chats.includes(user)) {
  //     setChat((prev) => {
  //       const t = [user, ...prev];
  //       console.log(t);
  //       return t;
  //     });
  //   }
  // };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axiosInstance.get('/users/friend/' + user._id);
        setFriends(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, [user._id]);

  return (
    <div className={style.messenger}>
      <div className={show ? style.messengerContent : style.none}>
        <div className={style.top}>
          <span className={style.title}>Chat</span>
          <div className={style.icons}>
            <VideoCall /> <MoreVert /> <Create />
          </div>
        </div>
        <input placeholder="Search Messenger" className={style.searchInput} />

        <ul className={style.friendsList}>
          {friends?.map((u, id) => (
            <FriendsOnline
              key={id}
              user={u}
              value={u}
              className={style.friendsOnline}
            />
          ))}
        </ul>
      </div>

      <div className={chats?.length > 0 ? style.chatlist : style.none}>
        <ul className={chats?.length > 0 ? style.chats : style.none}>
          {chats?.slice(0, 3).map((u) => (
            <li className={style.chat}>
              <SingleMessage key={u._id} user={u} />
            </li>
          ))}
        </ul>
        <div className={style.remainingChats}>
          {chats?.slice(3).map((u) => (
            <div
              className={style.remainingChat}
              key={u._id}
              style={{
                backgroundSize: 'contain',
                backgroundImage: `url(${PF + '/' + u.profilePicture})`,
              }}
            >
              {u.username?.charAt(0).toUpperCase() + u.username?.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
