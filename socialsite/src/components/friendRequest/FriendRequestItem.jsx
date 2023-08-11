import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../proxySettings";
import styles from "./FriendRequest.module.css";
import { DeleteFriendRequest, confirmFriendRequest } from "../../utils/generalServices";
const Folder = process.env.REACT_APP_PUBLIC_FOLDER;
const NOIMAGE = process.env.REACT_APP_NO_IMAGE;
export const FriendRequestItem = ({ userid, handleClickUp }) => {
  const [userWithRequest, setUserWithRequest] = useState("");
  const { user, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${userid}`);

      setUserWithRequest(res.data);
    };
    fetchUser();
  }, [userid]);

  const confirmRequest = () => {
    confirmFriendRequest(userid, user, dispatch);
    DeleteFriendRequest(userid, user, dispatch);
  };

  const handleClick = async () => {
    try {
      const res = await axiosInstance.put(`users/${userid}/cancelrequest`, {
        id: user._id,
      });
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: "FRIEND_REQUEST",
          payload: { ...user, friendRequest: res.data },
        });

        try {
          const res = await axiosInstance.put(`users/${userid}/friend`, {
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
    <div>
      <li className={styles.friendsInfo}>
        <div className={styles.fulldetails}>
          <div className={styles.details}>
            <div className={styles.profileImgContainer}>
              <img
                src={
                  userWithRequest.profilePicture
                    ? Folder + "/" + userWithRequest?.profilePicture
                    : NOIMAGE
                }
                alt=""
                className={styles.friendsPics}
              />
            </div>

            <span className={styles.friendsName}>
              {userWithRequest?.username?.charAt(0).toUpperCase() +
                userWithRequest?.username?.slice(1)}
            </span>
          </div>
          <button onClick={confirmRequest}>Accept</button>
          <button onClick={DeleteFriendRequest}>cancel</button>
        </div>
      </li>
    </div>
  );
};
