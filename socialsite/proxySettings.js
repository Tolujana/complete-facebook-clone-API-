import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8800' || 'https://socialmedia-site.herokuapp.com/',
});
// baseURL: 'https://socialmedia-site.herokuapp.com/',
