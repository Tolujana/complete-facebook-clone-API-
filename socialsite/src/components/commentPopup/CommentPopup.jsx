import React from "react";
import PostInComment from "../post/PostInComment";
import styles from "./commentPopup.module.css";
const CommentPopup = ({ post, user }) => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.title}>{`${user}'s Post`}</div>
      <PostInComment post={post} />
    </div>
  );
};

export default CommentPopup;
