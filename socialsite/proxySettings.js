import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://socialmedia-site.herokuapp.com/',
});
// baseURL: 'https://socialmedia-site.herokuapp.com/',
// 'http://localhost:8800' ||
