import axios from "axios";
const API = process.env.REACT_APP_BASEURL;
const LocalAPI = "http://localhost:8800";
const RemoteApi = "https://facebook-clone-apizz.onrender.com";
export const axiosInstance = axios.create({
  // baseURL: 'https://socialmedia-site.herokuapp.com/api/',
  baseURL: API,
  // validateStatus: function (status) {
  //   return status >= 200 && status < 300; // default
  // },
});
