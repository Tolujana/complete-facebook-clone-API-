import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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
import { axiosInstance } from '../../proxySettings';
const MessageSet = new Set();

function Topmenu() {
  const {
    user,
    dispatch,
    chats,
    messages,
    socket: savedSocket,
  } = useContext(AuthContext);
  const socket = useRef();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showMessenger, setShowMessenger] = useState(false);
  const [showFriendRequest, setShowFriendRequest] = useState(false);
  const [latestMessage, setlatestMessage] = useState({});
  const lattestMessage = useRef({});

  console.log(messages ? messages : '');

  useEffect(() => {
    const socket = io('https://socialmedia-site.herokuapp.com/');
    //const socket = io('http://localhost:8800');
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
    messages?.forEach((message) => MessageSet.add(message.receiverId));
  }, [messages]);

  useEffect(() => {
    savedSocket?.on('getMessage', (data) => {
      lattestMessage.current = {
        senderId: data?.senderId,
        receiverId: user._id,
        message: data?.message,
        createdAt: Date.now(),
      };
      // console.log(data?.senderId);
      // setlatestMessage((prev) => ({
      //   senderId: data?.senderId,
      //   receiverId: user._id,
      //   message: data?.message,
      //   createdAt: Date.now(),
      // }));

      dispatch({ type: 'CHATMESSAGES', payload: lattestMessage?.current });
    });
  }, [savedSocket, user._id, dispatch]);

  console.log(chats);
  console.log(lattestMessage.current);

  useEffect(() => {
    const fetchUser = async () => {
      if (
        !chats?.some((user) => user._id === lattestMessage.current.senderId)
      ) {
        const res = await axiosInstance.get(
          `/users?userId=${lattestMessage.current.senderId}`
        );

        const userData = {
          username: res.data.username,
          _id: res.data._id,
          profilePicture: res.data.profilePicture,
        };

        dispatch({ type: 'CHAT_START', payload: userData });
      }
    };

    fetchUser();
  }, [chats, dispatch, lattestMessage.current.senderId]);

  // useEffect(() => {
  //   if (
  //     messages.some(
  //       (message) => message.receiverId !== user._id && !chats?.includes(user)
  //     )
  //   ) {
  //     dispatch({ type: 'CHAT_START', payload: user });
  //   }
  // }, [messages, dispatch, user, chats]);

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
            <span
              className={styles.topmenuIconValue}
              style={{
                display: MessageSet.size > 0 ? 'flex' : 'none',
              }}
            >
              {MessageSet.size}
            </span>
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
