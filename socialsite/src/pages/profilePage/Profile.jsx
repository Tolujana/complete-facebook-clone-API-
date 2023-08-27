import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Content from "../../components/content/Content";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Topmenu from "../../components/topmenu/topmenu";
import styles from "./Profile.module.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../proxySettings";
import {
  DeleteFriendRequest,
  confirmFriend,
  confirmFriendRequest,
  handleFiles,
  openPopupDialog,
  uploadData,
  uploadtoServer,
} from "../../utils/generalServices";
import StoryEditor from "../../components/story/StoryEditor";
import { useNavigate } from "react-router-dom";
import FriendRequest from "../../components/friendRequest/FriendRequest";
import { hasFriendRequest, sendMessage, updateFriendship } from "../../utils/profileServices";

const PUBLIC_UPLOAD_FOLDER = process.env.REACT_APP_IMAGES_FOLDER;
const coverImage = process.env.REACT_APP_NO_COVERIMAGE;
const NOIMAGE = process.env.REACT_APP_NO_IMAGE;
const Profile = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [friendRequest, setFriendRequest] = useState([]);
  const [isFriendRequest, setIsFriendRequest] = useState(false);

  const [showButton, setShowButton] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const username = useParams().username.toLowerCase();
  const { user: currentUser, chats, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const usernameCapitalised = user?.username?.charAt(0)?.toUpperCase() + user?.username?.slice(1);

  const editProfileAction = { type: "MODAL_TYPE", payload: { name: "editProfile" } };
  const friendStatusAction = { type: "MODAL_TYPE", payload: { name: "Update Friend status" } };
  const openEditProfileDialog = () => {
    openPopupDialog(editProfileAction, dispatch);
  };

  const openFriendStatusDialog = () => {
    openPopupDialog(friendStatusAction, dispatch);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axiosInstance.get(`/users?username=${username}`);
      const friendRequest = await axiosInstance.get(`/users/friendrequests/${currentUser._id}`);
      setFriendRequest(friendRequest.data);
      setUser(response.data);

      updateButtonText(response.data, friendRequest.data);
    };

    fetchUser();
  }, []);

  const updateButtonText = (user, recievedRequest) => {
    const hasSentRequest = hasFriendRequest(user.friendRequest, currentUser._id);

    if (hasSentRequest) {
      setButtonText("Cancel Request");
      setIsFriendRequest(true);
    } else if (user?.friends?.includes(currentUser._id)) {
      setButtonText("Friends");
    } else if (recievedRequest?.includes(user._id)) {
      setButtonText("Respond");
    } else {
      setButtonText("Add Friend");
    }
  };

  const deleteRequest = () => {
    const isDeleted = DeleteFriendRequest(user._id, currentUser);
    if (isDeleted) {
      setButtonText("AddFriend");
    }
  };
  const AddToStoryOrUpdateFriendship = () => {
    if (username !== currentUser.username) {
      //send friend request or remove friend
      updateFriendship(user, friendRequest, currentUser._id, setButtonText);
    } else {
      navigate("/create-story");
    }
  };

  const EditProfileOrSendMessage = () => {
    if (username === currentUser.username) {
      openEditProfileDialog();
    } else {
      const data = {
        username: user.username,
        pic: user.profileImg,
        _id: user._id,
      };
      sendMessage(data, chats, dispatch);
    }
  };

  const updateProfilePic = (e) => {
    const [fileNames, data, filesArray, errorMessage] = handleFiles(e.target.files);

    uploadtoServer(`/users/${currentUser._id}/updatepics`, data, { profilePicture: fileNames[0] });
  };

  // const handleFile = async (e) => {
  //   const fileData = e.target.files[0];

  //   if (fileData) {
  //     const data = new FormData();
  //     const fileName = Date.now() + fileData.name;
  //     console.log("thisis", fileName);
  //     data.append("name", fileName);
  //     data.append("file", file);

  //     user.profileImg = fileName;
  //     try {
  //       await axiosInstance.post("/upload", data);
  //     } catch (error) {}

  //     try {
  //       await axiosInstance.put(`/${currentUser._id}/update`, { profilePicture: fileName });
  //       window.location.reload();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

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
                    ? PUBLIC_UPLOAD_FOLDER + coverImage
                    : PUBLIC_UPLOAD_FOLDER + "/" + user.coverPicture
                }
                alt=""
                className={styles.profileCoverImg}
              />
            </div>
            <div className="profilecontainer">
              <div className={styles.profileInfos}>
                <div className={styles.imaged}>
                  <img
                    src={
                      user.profilePicture
                        ? PUBLIC_UPLOAD_FOLDER + "/" + user.profilePicture
                        : NOIMAGE
                    }
                    alt=""
                    className={styles.profileImg}
                  />
                  {user._id === currentUser._id && (
                    <label htmlFor="file">
                      <div className={styles.editbutton} style={{ display: "block" }}>
                        Edit
                      </div>
                    </label>
                  )}
                  <input hidden onChange={updateProfilePic} type="file" name="upload" id="file" />
                </div>
                <div className={styles.profileInfo}>
                  <span className={styles.profileName}>
                    {user?.username?.charAt(0)
                      ? user?.username?.charAt(0)?.toUpperCase() + user?.username?.slice(1)
                      : ""}
                  </span>
                  <span className={styles.profilefriends}>1.5k friends</span>
                  <div className={styles.friendImg}></div>
                </div>
                <div className={styles.profileButtons}>
                  <div
                    className={buttonText !== "Friends" ? styles.firstAction : styles.secondAction}
                    onClick={AddToStoryOrUpdateFriendship}
                  >
                    {username === currentUser.username ? "Add To Story" : buttonText}
                  </div>
                  <div
                    className={buttonText !== "Friends" ? styles.secondAction : styles.firstAction}
                    onClick={EditProfileOrSendMessage}
                  >
                    {username === currentUser.username ? "Edit Profile" : "Message"}
                  </div>
                </div>
              </div>
              {buttonText === "Respond" && (
                <div className={styles.friendRequest}>
                  <div className={styles.requestInfo}>
                    <h3>{usernameCapitalised} sent you a request</h3>
                  </div>
                  <div className={styles.requestButton}>
                    <div
                      className={styles.confirmButton}
                      onClick={() => {
                        confirmFriend(user._id, currentUser, dispatch, setButtonText);
                      }}
                    >
                      Confirm Request
                    </div>
                    <div className={styles.deleteButton} onClick={deleteRequest}>
                      Delete Request
                    </div>
                  </div>
                </div>
              )}
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
