import React, { useContext, useRef, useState } from 'react';
import styles from './Share.module.css';
import TheatersIcon from '@mui/icons-material/Theaters';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MoodIcon from '@mui/icons-material/Mood';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { axiosInstance } from '../../proxySettings';
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
function Share() {
  const { user } = useContext(AuthContext);
  const userInput = useRef();
  const [file, setFile] = useState(null);

  const handlefile = (e) => {
    setFile(e.target.files[0]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      desc: userInput.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append('name', fileName);
      data.append('file', file);

      newPost.img = fileName;
      try {
        await axiosInstance.post('/upload', data);
      } catch (error) {}
    }

    try {
      await axiosInstance.post('/posts', newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.share}>
      <form className={styles.shareWrapper} encType="multipart/form-data">
        <div className={styles.shareTop}>
          <img
            src={
              !user.profilePicture
                ? PF + '/noimage.png'
                : PF + '/' + user.profilePicture
            }
            alt=""
            className={styles.sharepics}
          />
          <div className={styles.inputContainer}>
            <input
              ref={userInput}
              placeholder={"what's on your " + user.username + '?'}
              className={styles.shareInput}
            />
          </div>
        </div>
        <hr className={styles.shareHr} />
        <div className={styles.shareBottom}>
          <div className={styles.shareOptions}>
            <div className={styles.shareOption}>
              <TheatersIcon htmlColor="red" className={styles.shareIcon} />
              <span className={styles.ShareOptionText}>Live Video</span>
            </div>
            <div className={styles.shareOption}>
              <PhotoLibraryIcon
                htmlColor="green"
                className={styles.shareIcon}
              />
              <label htmlFor="file" className={styles.ShareOptionText}>
                Photo/Video
              </label>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                className=""
                accept=".png,.jpeg,.jpg,.mp4"
                onChange={handlefile}
              />
            </div>
            <div className={styles.shareOption}>
              <MoodIcon htmlColor="Goldenrod" className={styles.shareIcon} />
              <span className={styles.ShareOptionText}>Feeling/Activity</span>
            </div>
            <div className={`${styles.shareOption} ${styles.green}`}>
              <span onClick={submitHandler} className={styles.ShareOptionText}>
                Share
              </span>
            </div>
          </div>
        </div>
      </form>
      <div className={styles.chat}>
        <div className={styles.chatButton}>
          <VideoCameraFrontIcon className={styles.chatIcon} />
          <span className={styles.chatText}>Create room</span>
        </div>
        <div className={styles.friends}>
          <div className={styles.imgContainer}>
            <img
              src="/images/persons/1.jpg"
              alt=""
              className={styles.chatImg}
            />
          </div>
          <div className={styles.imgContainer}>
            <img
              src="/images/persons/1.jpg"
              alt=""
              className={styles.chatImg}
            />
          </div>
          <div className={styles.imgContainer}>
            <img
              src="/images/persons/1.jpg"
              alt=""
              className={styles.chatImg}
            />
          </div>
          <div className={styles.imgContainer}>
            <img
              src="/images/persons/1.jpg"
              alt=""
              className={styles.chatImg}
            />
          </div>
          <div className={styles.imgContainer}>
            <img
              src="/images/persons/1.jpg"
              alt=""
              className={styles.chatImg}
            />
          </div>
          <div className={styles.imgContainer}>
            <img
              src="/images/persons/1.jpg"
              alt=""
              className={styles.chatImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;
