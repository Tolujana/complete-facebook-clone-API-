import style from './FriendRequest.module.css';
import { VideoCall, MoreVert, Create } from '@mui/icons-material';

import { FriendRequestItem } from '../friendRequest/FriendRequestItem';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import SingleMessage from '../singlemessage/SingleMessage';
import { formLabelClasses } from '@mui/material';
import { axiosInstance } from '../../proxySettings';
const FriendRequest = ({ show }) => {
  const { user } = useContext(AuthContext);

  return (
    <div className={style.request}>
      <div className={show ? style.requestContent : style.none}>
        <div className={style.top}>
          <span className={style.title}>Friend Requests</span>
        </div>

        <ul className={style.friendsList}>
          {user?.friendRequest?.map((u) => (
            <FriendRequestItem key={u} userid={u} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendRequest;
