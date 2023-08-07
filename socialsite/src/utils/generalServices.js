import { axiosInstance } from "../proxySettings";

export const openPopupDialog = (action, dispatch) => {
  dispatch(action);
};

export const confirmFriendRequest = async (userId, currentUser, dispatch) => {
  try {
    const res = await axiosInstance.put(`users/${userId}/friend`, {
      userId: currentUser._id,
    });
    if (res.status === 200) {
      dispatch({
        type: "UPDATE_FRIEND",
        payload: { ...currentUser, friends: res.data },
      });
    }
  } catch (error) {}
};

export const cancelFriendRequest = async (userId, currentUser, dispatch) => {
  try {
    const res = await axiosInstance.put(`users/${userId}/cancelrequest`, {
      id: currentUser._id,
    });

    if (res.status === 200) {
      dispatch({
        type: "UPDATE_FRIENDREQUEST",
        payload: { ...currentUser, friendRequest: res.data },
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
