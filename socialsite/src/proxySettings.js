import axios from "axios";
API = process.env.REACT_APP_BASEURL;
export const axiosInstance = axios.create({
  // baseURL: 'https://socialmedia-site.herokuapp.com/api/',
  baseURL: "https://facebook-clone-apizz.onrender.com",
  // validateStatus: function (status) {
  //   return status >= 200 && status < 300; // default
  // },
});
