import style from "./content.module.css";
import React, { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../proxySettings";
import Story from "../story/Story";
let offset = 0;

function Content({ username }) {
  const [posts, setPost] = useState([]);
  const { user } = useContext(AuthContext);
  const fetchPost = async (offset) => {
    const res = username
      ? await axiosInstance.get(
          "/posts/profile/" + username + "?offset=" + offset
        )
      : await axiosInstance.get(
          `posts/timeline/${user._id}` + "?offset=" + offset
        );
    const sortedPost = res.data.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
    });
    setPost((oldPost) => [...oldPost, ...sortedPost]);
  };

  const loadmore = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    if (window.innerHeight + scrollTop + 7 >= scrollHeight) {
      offset += 3;
      fetchPost(offset);
    }
  };
  useEffect(() => {
    fetchPost(0);
    window.addEventListener("scroll", loadmore);
  }, [username, user._id]);

  return (
    <div className={style.content}>
      <div className={style.wrapper}>
        {username !== user.username && (
          <>
            <Story />
            <Share />
          </>
        )}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Content;
