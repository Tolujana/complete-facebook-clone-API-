import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://socialmedia-site.herokuapp.com/api/',
});
