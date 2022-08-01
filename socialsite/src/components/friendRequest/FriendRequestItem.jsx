import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../proxySettings';
import styles from './FriendRequest.module.css';
const Folder = process.env.REACT_APP_PUBLIC_FOLDER;
export const FriendRequestItem = ({ userid, handleClickUp }) => {
  const [userRequest, setUserRequest] = useState('');
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${userid}`);

      setUserRequest(res.data);
    };
    fetchUser();
  }, [userid]);

  const handleClick = async () => {
    try {
      const res = await axiosInstance.put(`users/${userid}/cancelrequest`, {
        id: user._id,
      });
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: 'FRIEND_REQUEST',
          payload: { ...user, friendRequest: res.data },
        });

        try {
          const res = await axiosInstance.put(`users/${userid}/follow`, {
            userId: user._id,
          });
          console.log(res.data);
        } catch (error) {}
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div onClick={handleClick}>
      <li className={styles.friendsInfo}>
        <div className={styles.fulldetails}>
          <div className={styles.details}>
            <div className={styles.profileImgContainer}>
              <img
                src={
                  userRequest.profilePicture
                    ? Folder + '/' + userRequest?.profilePicture
                    : Folder + '/noimage.png'
                }
                alt=""
                className={styles.friendsPics}
              />
            </div>

            <span className={styles.friendsName}>{userRequest.username}</span>
          </div>
          <button onClick={handleClick}>Accept</button>
        </div>
      </li>
    </div>
  );
};
