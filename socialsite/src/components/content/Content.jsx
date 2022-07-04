import style from './content.module.css';
import React, { useContext, useEffect, useState } from 'react';
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { axiosInstance } from '../../proxySettings';

function Content({ username }) {
  const [posts, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axiosInstance.get('/posts/profile/' + username)
        : await axiosInstance.get(`posts/timeline/${user._id}`);

      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user._id]);
  return (
    <div className={style.content}>
      <div className={style.wrapper}>
        {username === user.username && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Content;
