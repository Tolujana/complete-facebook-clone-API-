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
import { openPopupDialog } from "../../utils/generalServices";
import StoryEditor from "../../components/story/StoryEditor";
import { useNavigate } from "react-router-dom";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const coverImage = process.env.REACT_APP_NO_COVERIMAGE;
const NOIMAGE = process.env.REACT_APP_NO_IMAGE;
const Profile = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const username = useParams().username.toLowerCase();
  const { user: currentUser, chats, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

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
      const res = await axiosInstance.get(`/users?username=${username}`);
      updateFriendStatus(res.data);
      setUser(res.data);
    };

    fetchUser();
  }, []);

  const updateFriendStatus = (user) => {
    if (user?.friendRequest?.includes(currentUser._id)) {
      setButtonText("Cancel-Request");
    }

    if (currentUser?.following?.includes(user._id)) {
      setButtonText("Friends");
    }
  };

  const AddToStoryOrUpdateFriendship = () => {
    if (username !== currentUser.username) {
      //send friend request or remove friend
      updateFriendship();
    } else {
      navigate("/create-story");
    }
  };
  const EditProfileOrSendMessage = () => {
    if (username === currentUser.username) {
      openEditProfileDialog();
    } else {
      sendMessage();
    }
  };

  const updateFriendship = async () => {
    try {
      if (
        !currentUser?.friendRequest?.includes(user._id) ||
        !currentUser?.following?.includes(user._id)
      ) {
        const data = { id: currentUser._id };
        const res = await axiosInstance.put("/users/" + user._id + "/request", data);

        setButtonText(res.data);
      }
    } catch (err) {}
  };
  const sendMessage = async () => {
    const data = {
      username: user.username,
      pic: user.profileImg,
      _id: user._id,
    };
    if (!chats.includes(data)) {
      dispatch({ type: "CHAT_START", payload: data });
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

      data.append("name", fileName);
      data.append("file", file);
      console.log(fileName);
      user.profileImg = fileName;
      try {
        await axiosInstance.post("/upload", data);
      } catch (error) {}

      try {
        await axiosInstance.put("/:id/update", { profilePicture: fileName });
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
                src={!user.coverPicture ? PF + coverImage : PF + "/" + user.coverPicture}
                alt=""
                className={styles.profileCoverImg}
              />
            </div>
            <div className={styles.profileInfos}>
              <div
                className={styles.imaged}
                // onMouseOver={handleEditButton}
                // onMouseLeave={handleEditButton_2}
              >
                <img
                  src={!user.profilePicture ? NOIMAGE : PF + "/" + user.profilePicture}
                  alt=""
                  className={styles.profileImg}
                />
                <label htmlFor="file">
                  <div className={styles.editbutton} style={{ display: "block" }}>
                    Edit
                  </div>
                </label>
                <input hidden onChange={handleFile} type="file" name="upload" id="file" />
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
                <span
                  className={
                    username === currentUser.username ? styles.firstAction : styles.secondAction
                  }
                  onClick={AddToStoryOrUpdateFriendship}
                >
                  {username === currentUser.username
                    ? "Add To Story"
                    : buttonText !== ""
                    ? buttonText
                    : "Add Friend"}
                </span>
                <span
                  className={
                    username === currentUser.username ? styles.secondAction : styles.firstAction
                  }
                  onClick={EditProfileOrSendMessage}
                >
                  {username === currentUser.username ? "Edit Profile" : "Message"}
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
