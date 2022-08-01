import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './topmenu.module.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Messenger from '../messenger/Messenger';
import FriendRequest from '../friendRequest/FriendRequest';
import { io } from 'socket.io-client';

function Topmenu() {
  const {
    user,
    dispatch,
    messages,
    socket: savedSocket,
  } = useContext(AuthContext);
  const socket = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showMessenger, setShowMessenger] = useState(false);
  const [showFriendRequest, setShowFriendRequest] = useState(false);
  console.log(messages ? messages : '');
  useEffect(() => {});
  useEffect(() => {
    const socket = io('ws://localhost:8800');
    dispatch({ type: 'SOCKET', payload: socket });

    socket.emit('addUser', user._id);
    socket.on('rebroadcastUser', (data) => {
      if (socket.id !== data) {
        socket.emit('readdUser', user._id);
      }
    });
    socket.on('users', (users) => {
      console.log(users);
    });
  }, [dispatch, user._id]);

  useEffect(() => {
    savedSocket?.on('getMessage', (data) => {
      const latestMessage = {
        senderId: data?.senderId,
        receiverId: user._id,
        message: data?.message,
        createdAt: Date.now(),
      };

      dispatch({ type: 'CHATMESSAGES', payload: latestMessage });
    });
  }, [savedSocket, dispatch, user._id]);

  const toggleMessenger = () => {
    if (showFriendRequest) {
      setShowFriendRequest(false);
    }
    setShowMessenger((prev) => {
      return !prev;
    });
  };
  const toggleFriendRequest = () => {
    if (showMessenger) {
      setShowMessenger(false);
    }
    setShowFriendRequest((prev) => {
      return !prev;
    });
  };

  return (
    <div className={styles.topmenuContainer}>
      <div className={styles.topmenuLeft}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className={styles.logo}>FinJana</span>
        </Link>
      </div>
      <div className={styles.topmenuCenter}>
        <div className={styles.searchBar}>
          <SearchIcon />
          <input
            placeholder="Search for friends"
            className={styles.searchInput}
          />
        </div>
      </div>
      <div className={styles.topmenuRight}>
        <div className="topmenuLinks">
          <span className={styles.toplink}> </span>
          <span className={styles.toplink}> </span>
        </div>
        <div className={styles.topmenuIcons}>
          <div className={styles.topmenuIconItem}>
            <PersonIcon onClick={toggleFriendRequest} />
            <span
              className={styles.topmenuIconValue}
              style={{
                display: user.friendRequest.length > 0 ? 'flex' : 'none',
              }}
            >
              {user.friendRequest.length}
            </span>
          </div>
          <div className={styles.topmenuIconItem}>
            <ChatBubbleIcon onClick={toggleMessenger} />
            <span className={styles.topmenuIconValue}>1</span>
          </div>
          <div className={styles.topmenuIconItem}>
            <PublicIcon />
            <span className={styles.topmenuIconValue}>1</span>
          </div>
          <div className={styles.messenger}>
            <Messenger show={showMessenger} />
          </div>
          <div className={styles.friendrequest}>
            <FriendRequest show={showFriendRequest} />
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + '/' + user.profilePicture
                : `${PF}/noimage.png`
            }
            alt=""
            className={styles.profilepic}
          />
        </Link>
      </div>
    </div>
  );
}

export default Topmenu;
