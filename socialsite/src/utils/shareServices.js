import { axiosInstance } from "../proxySettings";

export const sharePost = async (e, newPost, file) => {
  e.preventDefault();

  //   const newPost = {
  //     userId: user._id,
  //     desc: userInput.current.value,
  //   };
  if (file) {
    const data = new FormData();
    const fileName = Date.now() + file.name;

    data.append("name", fileName);
    data.append("file", file);

    newPost.img = fileName;
    try {
      await axiosInstance.post("/upload", data);
    } catch (error) {}
  }

  try {
    await axiosInstance.post("/posts", newPost);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
