import React, { useEffect, useState } from "react";
import { useRef } from "react";
import styles from "./story.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { removeButton, currentElement } from "../../utils/storyServices";
let scrollAmount = 0;
const Story = () => {
  const stories = useRef();
  const [scrollState, setScrollState] = useState();

  function scrollStory(e, ref) {
    e.preventDefault();
    const element = ref.current;
    const maxScroll = element.scrollWidth - 500; // 500 is width of scrollTray in pixel
    if (e.currentTarget.className.includes("previousItems")) {
      scrollAmount = scrollAmount < 0 ? 0 : (scrollAmount -= 112.5);
      element.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: "smooth",
      });
    } else {
      scrollAmount =
        scrollAmount > maxScroll ? maxScroll : (scrollAmount += 112.5);
      element.scrollTo({
        top: 0,
        left: scrollAmount,
        behavior: "smooth",
      });
    }
    setScrollState([scrollAmount, element.scrollWidth]);
  }

  const displayNoneleft = scrollState?.[0] < 10 ? styles.displayNone : "";
  const displayNoneRight =
    scrollState?.[0] > scrollState?.[1] - 500 ? styles.displayNone : "";

  return (
    <div className={styles.stories}>
      <div className={styles.storiesTray} ref={stories}>
        <div
          className={`${styles.previousItems}  ${displayNoneleft}`}
          onClick={(event) => scrollStory(event, stories)}
        >
          <ArrowBackIosIcon className={styles.buttons} />
        </div>
        <div className={styles.storyContainer}>
          <div className={styles.story}>
            <div className={styles.profilePics}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.story}>
            <div className={styles.profilePics}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.story}>
            <div className={styles.profilePics}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.story}>
            <div className={styles.profilePics}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.story}>
            <div className={styles.profilePics}>
              <img src="" alt="" />
            </div>
          </div>
          <div className={styles.story}>
            <div className={styles.profilePics}>
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <div
          className={`${styles.nextItems} ${displayNoneRight}`}
          onClick={(event) => scrollStory(event, stories)}
        >
          <ArrowForwardIosIcon className={styles.buttons} />
        </div>
      </div>
    </div>
  );
};

export default Story;
