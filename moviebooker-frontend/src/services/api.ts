import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // YEH DEKHO

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Authentication interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
