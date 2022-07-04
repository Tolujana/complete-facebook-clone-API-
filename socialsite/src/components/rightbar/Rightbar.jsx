import React from "react";
import styles from "./rightbar.module.css";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";

import MoreMenu from "../moreMenu/MoreMenu";
import GroupIcon from "@mui/icons-material/Group";
import { Users } from "../../dummyData";
import { FriendsOnline } from "../friends/FriendsOnline";
const Folder= process.env.REACT_APP_PUBLIC_FOLDER;

function Rightbar() {
  return (
    <div className={styles.rightBar}>
      <div className={styles.miniNotification}>
        <div className={styles.birthday}>
          <span className={styles.title}>Birthdays</span>
        </div>
        <div className={styles.friendRequest}>
          <div className={styles.top}>
            <div className={styles.heading}>
              <GroupIcon />
              <span className={styles.title}>Friend request</span>
            </div>
            <MoreMenu />
          </div>
          <div className={styles.middle}>
            <div className={styles.middleTop}>
              <div className={styles.imgdiv}>
                <img
                  src="/assets/persons/2.jpg"
                  alt=""
                  className={styles.friend}
                />
              </div>

              <div className={styles.info}>
                <span className={styles.friendName}> DamiLola Olofinjana</span>
                <div className={styles.imgMutualFriends}>
                  <img
                    src="/assets/persons/1.jpg"
                    alt=""
                    className={styles.imgMutualFriend}
                  />
                  <img
                    src="/assets/persons/1.jpg"
                    alt=""
                    className={styles.imgMutualFriend}
                  />
                  <span className={styles.mutualFriend}>9mutual friends</span>
                </div>
              </div>
              <span className={styles.friendRequestTime}> 3h</span>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.line} />
      <div className={styles.sponsored}>
        <span className={styles.title}>Sponsored</span>
        <div className={styles.Rightads}>
          <img src="assets/ads/1.jpg" alt="" className={styles.Rightad} />
        </div>
        <div className={styles.Rightads}>
          <img src="assets/ads/1.jpg" alt="" className={styles.Rightad} />
        </div>
      </div>
      <hr className={styles.line} />
      <div className={styles.contactDetail}>
        <div className={styles.contactstitle}>
          <span className={styles.title}>Contacts</span>
          <div className={styles.contactButtons}>
            <VideoCallIcon className={styles.videoCall} />
            <SearchIcon className={styles.Search} />
            <MoreMenu />
          </div>
        </div>
        <ul className={styles.friendsList}>
          {Users.map((u) => (
            <FriendsOnline key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Rightbar;
