import React, { useContext, useEffect, useState } from "react";
import styles from "./Post.module.css";
import PublicIcon from "@mui/icons-material/Public";
import MoreMenu from "../moreMenu/MoreMenu";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../proxySettings";
import DisplayData from "../display/DisplayData";
import { openPopupDialog } from "../../utils/generalServices";
const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
const EXTERNAL_FOLDER = process.env.REACT_APP_EXTERNAL_FOLDER;

const Post = ({ post }) => {
  const [likes, setLike] = useState(post.likes.length);

  const [isLiked, setisLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const nameInUpperCase =
    user?.username?.charAt(0).toUpperCase() + user.username?.slice(1);
  const action = {
    type: "MODAL_TYPE",
    payload: { name: "comment", post: post, user: nameInUpperCase },
  };

  const openCommentDialog = () => {
    openPopupDialog(action, dispatch);
  };

  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      const res = axiosInstance.put(`/posts/${post._id}/like`, {
        userId: currentUser._id,
      });
      console.log(res);
    } catch (error) {
      if (isLiked) {
        setLike(likes - 1);
        setisLiked(!isLiked);
      } else {
        setLike(likes + 1);
        setisLiked(isLiked);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className={styles.post}>
      <div className={styles.postWrapper}>
        <div className={styles.postTop}>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                PUBLIC_FOLDER + "/" + user.profilePicture ||
                PUBLIC_FOLDER + "noimage.png"
              }
              alt=""
              className={styles.postImg}
            />
          </Link>
          <div className={styles.postDetail}>
            <span className={styles.postName}>{nameInUpperCase}</span>
            <div className={styles.time}>
              <span className={styles.timeStamp}>{format(post.createdAt)}</span>
              <span className={styles.timeStampDot}>.</span>
              <PublicIcon className={styles.timeIcon} />
            </div>
          </div>

          <MoreMenu />
        </div>
        <div className={styles.postMiddle}>
          <span className={styles.postText}>{post?.desc}</span>
          <div className={styles.postMedia}>
            {post.files ? (
              <DisplayData files={post.files} cssName={post?.cssName} />
            ) : (
              <img
                src={EXTERNAL_FOLDER + post.img}
                alt=""
                className={styles.postContentImg}
              />
            )}
          </div>
        </div>
        <div className={styles.postBottom}>
          <div className={styles.postBottomStats}>
            <div className={styles.likes}>
              <img
                className={styles.postLike}
                src={EXTERNAL_FOLDER + "/likes.png"}
                alt=""
              />
              <span className={styles.likesCounter}>{likes}</span>
            </div>
            <div className={styles.counters}>
              <span className={styles.commentCounter}>
                {post.comment} Comments
              </span>
              <span className={styles.shareCounter}>998 Shares</span>
            </div>
          </div>

          <div className={styles.postActions}>
            <div className={styles.postBottomAction}>
              <ThumbUpIcon />
              <div onClick={likeHandler} className={styles.like} id="">
                {isLiked ? "Unlike" : "Like"}
              </div>
            </div>
            <div
              className={styles.postBottomAction}
              onClick={openCommentDialog}
            >
              <ChatBubbleOutlineIcon />
              <div className={styles.comment} id="">
                Comment
              </div>
            </div>
            <div className={styles.postBottomAction}>
              <ReplyIcon />
              <div className={styles.share} id="">
                Share
              </div>
            </div>
          </div>

          <div className={styles.postBottomcomments}>
            <div className={styles.commentFIeld}>
              <div className={styles.postImg}>
                <img
                  src={
                    PUBLIC_FOLDER + "/" + currentUser.profilePicture ||
                    PUBLIC_FOLDER + "noimage.png"
                  }
                  alt=""
                  className={styles.postImg}
                />

                <div classname={styles.textArea}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Post;
