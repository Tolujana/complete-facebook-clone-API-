import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './Single.module.css';
import { io } from 'socket.io-client';
import { AuthContext } from '../../context/AuthContext';
import e from 'cors';
import Message from '../message/Message';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const SingleMessage = ({ user }) => {
  const {
    user: currentUser,
    socket,
    messages,
    dispatch,
  } = useContext(AuthContext);
  const [sockets, setSocket] = useState(null);
  const [newMessage, setnewMessage] = useState('');
  //const [messages, setMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState('');
  console.log(currentUser.profilePicture);

  // useEffect(() => {
  //   socket?.on('getMessage', (data) => {
  //     const latestMessage = {
  //       senderId: data?.senderId,
  //       message: data?.message,
  //       createdAt: Date.now(),
  //     };
  //     setReceivedMessage((prev) => ({
  //       senderId: data?.senderId,
  //       message: data?.message,
  //       createdAt: Date.now(),
  //     }));
  //     setMessages((prev) => {
  //       return [...prev, latestMessage];
  //     });
  //     console.log('recieved', latestMessage);
  //   });
  // }, [socket]);
  // sent socketid to server
  // useEffect(() => {
  //   socket.current.emit('addUser', currentUser._id);
  //   socket.current.on('users', (users) => {
  //     console.log(users);
  //   });
  // }, [currentUser]);

  const handleChange = (e) => {
    setnewMessage(e.target.value);
  };

  const handleMessage = (e) => {
    e.preventDefault();
    socket?.emit('sendMessage', {
      senderId: currentUser._id,
      receiverId: user._id,
      message: newMessage,
    });
    const data = {
      senderId: currentUser._id,
      receiverId: user._id,
      message: newMessage,
      createdAt: Date.now(),
    };
    dispatch({ type: 'CHATMESSAGES', payload: data });
    setnewMessage('');

    //setMessages((prev) => [...prev, data]);
    console.log(data);
    console.log('message', messages);
  };

  useEffect(() => {});
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.img}>
          <img
            src={
              !user.profilePicture
                ? PF + '/noimage.png'
                : PF + '/' + user.profilePicture
            }
            alt=""
            className={style.profileImg}
          />
        </div>
        <span className={style.username}>{user.username}</span>
      </div>
      {/* <div className={style.messaged}>
        {messages?.map((m, index) => (
          <div>
            <Message
              key={index}
              message={m}
              owner={m.senderId === currentUser._id}
            />
          </div>
        ))}
      </div> */}
      <ul className={style.messages}>
        {messages
          ?.filter((m) => m.receiverId === user._id || m.senderId === user._id)
          .map((m, id) => (
            <Message
              key={id}
              message={m.message}
              img={
                m.senderId === currentUser._id
                  ? currentUser.profilePicture
                  : user.profilePicture
              }
              createdAt={m.createdAt}
              owner={m.senderId === currentUser._id}
            />
          ))}
      </ul>
      <div className={style.text}>
        <form action="">
          <textarea
            name=""
            id="message"
            cols="30"
            rows="3"
            onChange={handleChange}
            value={newMessage}
            placeholder="send a message"
          ></textarea>
          <button
            type="submit"
            onClick={handleMessage}
            className={style.sendButton}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleMessage;
