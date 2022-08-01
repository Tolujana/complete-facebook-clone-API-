import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Content from '../../components/content/Content';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Topmenu from '../../components/topmenu/topmenu';
import styles from './Profile.module.css';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../proxySettings';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Profile = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [buttonText, setButtonText] = useState('');
  const username = useParams().username.toLowerCase();
  const { user: currentUser, chats, dispatch } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?username=${username}`);

      setUser(res.data);
    };

    fetchUser();
  }, [username]);

  const handleClick = async () => {
    setButtonText('...');
    try {
      if (username !== currentUser.username) {
        if (
          !currentUser?.friendRequest?.includes(user._id) ||
          !currentUser?.following?.includes(user._id)
        ) {
          const data = { id: currentUser._id };
          const res = await axiosInstance.put(
            '/users/' + user._id + '/request',
            data
          );
          console.log(res.data);
          setButtonText(res.data);
        }
      } else {
      }
    } catch (err) {}
  };
  const handleClick2 = async () => {
    if (!chats.includes(user._id)) {
      // const data ={username:user.username, pic:user.profileImg, _id:user._id}
      dispatch({ type: 'CHAT_START', payload: user._id });
    }
  };
  const handleEditButton = () => {
    setShowButton(true);
  };
  const handleEditButton_2 = () => {
    setShowButton(false);
  };
  const handleFile = async (e) => {
    setFile(e.target.value[0]);

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append('name', fileName);
      data.append('file', file);
      console.log(fileName);
      user.profileImg = fileName;
      try {
        await axiosInstance.post('/upload', data);
      } catch (error) {}

      try {
        await axiosInstance.put('/:id/update', { profilePicture: fileName });
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Topmenu />
      <div className={styles.profile}>
        <div className={styles.profileRight}>
          <div className={styles.profileRightTop}>
            <div className={styles.profileCover}>
              <img
                src={
                  !user.coverPicture
                    ? PF + '/coverimage.jpg'
                    : PF + '/' + user.coverPicture
                }
                alt=""
                className={styles.profileCoverImg}
              />
            </div>
            <div className={styles.profileInfos}>
              <div
                className={styles.imaged}
                onMouseOver={handleEditButton}
                onMouseLeave={handleEditButton_2}
              >
                <img
                  src={
                    !user.profilePicture
                      ? PF + 'noimage.png'
                      : PF + '/' + user.profilePicture
                  }
                  alt=""
                  className={styles.profileImg}
                />
                <label htmlFor="file">
                  <div
                    className="editbutton"
                    style={{ display: showButton ? 'block' : 'none' }}
                  >
                    Edit
                  </div>
                </label>
                <input
                  onChange={handleFile}
                  style={{ display: 'none' }}
                  type="file"
                  name="upload"
                  id="file"
                />
              </div>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>{user.username}</span>
                <span className={styles.profilefriends}>1.5k friends</span>
                <div className={styles.friendImg}></div>
              </div>
              <div className={styles.profileButtons} onClick={handleClick}>
                <span className={styles.Action2} onClick={handleClick}>
                  {username === currentUser.username
                    ? 'Add To Story'
                    : buttonText === 'friend added'
                    ? 'Cancel Request'
                    : 'Add Friend'}
                </span>
                <span className={styles.Action} onClick={handleClick2}>
                  {username === currentUser.username
                    ? 'Edit Profile'
                    : 'Message'}
                </span>
              </div>
            </div>
            <hr className={styles.dividingline} />
            <div className={styles.profileMenu}>
              <span className={styles.miniMenu}>Posts</span>
              <span className={styles.miniMenu}>About</span>
              <span className={styles.miniMenu}>Friends</span>
              <span className={styles.miniMenu}>Photos</span>
              <span className={styles.miniMenu}>Videos</span>
              <span className={styles.miniMenu}>Checkin</span>
              <span className={styles.miniMenu}>More</span>
            </div>
          </div>
        </div>
        <div className={styles.profileRightBottom}>
          <div className={styles.left}>
            <Leftbar user={user} />
          </div>

          <div className={styles.content}>
            <Content username={user.username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
