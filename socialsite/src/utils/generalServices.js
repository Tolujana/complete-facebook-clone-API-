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
      return true;
    }
  } catch (error) {}
};

export const DeleteFriendRequest = async (userId, currentUser) => {
  try {
    const res = await axiosInstance.put(`users/${userId}/cancelrequest`, {
      id: currentUser._id,
    });

    if (res.status === 200) {
      return true;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const confirmFriend = (userId, currentUser, dispatch, setButtonText) => {
  const isConfirmed = confirmFriendRequest(userId, currentUser, dispatch);

  if (isConfirmed) {
    DeleteFriendRequest(userId, currentUser);
    setButtonText("Friends");
  }
};

// export const handleFiless = (files, fromDragnDrop = false) => {
//   console.log(files);
//   if (fromDragnDrop && !checkFileIsValid(files)) setError("file/file(s)  not an image");

//   const data = new FormData();
//   const filesArray = Object.values(files);
//   let fileNames = [];
//   filesArray.forEach((file) => {
//     const fileName = Date.now() + file.name;
//     fileNames = [...fileNames, fileName];
//     data.append("files", file, fileName);
//   });
//   setFileNames(fileNames);
//   setUploadFiles(data);
//   setDisplayData(filesArray);
// };

const checkFileIsValid = (files) => {
  const check = !Object.values(files).some((file) => {
    const { type } = file;

    return !/mp4|jpg|jpeg|gif|png/.test(type);
  });
  return check;
};

export const handleFiles = (files, fromDragnDrop = false) => {
  let errorMessage = "";
  if (fromDragnDrop && !checkFileIsValid(files)) {
    errorMessage = "file/file(s)  not an image";
  }

  const data = new FormData();
  const filesArray = Object.values(files);
  let fileNames = [];
  filesArray.forEach((file) => {
    const fileName = Date.now() + file.name;
    fileNames = [...fileNames, fileName];
    data.append("files", file, fileName);
  });

  return [fileNames, data, filesArray, errorMessage];
};
