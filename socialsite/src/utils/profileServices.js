import { axiosInstance } from "../proxySettings";

export const hasFriendRequest = (userRequest, recipientID) => {
  return userRequest.some((request) => request.id === recipientID);
};

// export const updateFriendship = async (user, currentUserFriendRequests, currentUserId, setButtonText) => {
//   try {

//     if (!currentUserFriendRequests.includes(user._id) && !user?.friends?.includes(currentUserId)) {
//       const data = { id: currentUserId };
//       const res = await axiosInstance.put("/users/" + user._id + "/request", data);
//       // console.log("step one", res.data);
//       setButtonText(res.data);
//     }

//     if (user.friends?.includes(currentUserId)) {
//       const data = { id: currentUserId };
//       const res = await axiosInstance.put("/users/" + user._id + "/unfriend", data);
//       console.log("ia in");
//       setButtonText("Add Friend");
//     }
//   } catch (err) {}
// };

export const sendMessage = async (data, chats, dispatch) => {
  if (!chats.includes(data)) {
    dispatch({ type: "CHAT_START", payload: data });
  }
};

export const updateFriendship = async (
  user,
  currentUserFriendRequests,
  currentUserId,
  setButtonText
) => {
  try {
    const hasRequestbeensent = hasFriendRequest(currentUserFriendRequests, user._id);
    if (!hasRequestbeensent && !user?.friends?.includes(currentUserId)) {
      const data = { id: currentUserId };
      const res = await axiosInstance.put("/users/" + user._id + "/request", data);
      // console.log("step one", res.data);
      setButtonText(res.data);
    }

    if (user.friends?.includes(currentUserId)) {
      const data = { id: currentUserId };
      const res = await axiosInstance.put("/users/" + user._id + "/unfriend", data);
      console.log("ia in");
      setButtonText("Add Friend");
    }
  } catch (err) {}
};
