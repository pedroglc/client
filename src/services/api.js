import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://localhost:5000',
  baseURL: 'https://mern-app-api-plum.vercel.app',
});

export default api;
