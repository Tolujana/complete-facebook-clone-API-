import React from "react";
import PostInComment from "../post/PostInComment";
import styles from "./commentPopup.module.css";
import Post from "../post/Post";

const CommentPopup = ({ post, user, commentList }) => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.title}>{`${user}'s Post`}</div>
      <Post post={post} commentList={commentList} />
      <div>coomment field</div>
    </div>
  );
};

export default CommentPopup;
