import axios from 'axios';
import { API_URL, COOKIE_KEYS } from './constants';
import { getCookie } from './cookies';

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add bearer token
axiosClient.interceptors.request.use(
  (config) => {
    const token = getCookie(COOKIE_KEYS.ACCESS_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle unauthorized errors, token refresh, etc.
    if (error.response && error.response.status === 401) {
      // Logic for token refresh or redirecting to login can be handled here
      if (typeof window !== 'undefined') {
        // Option to clear cookies or redirect
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
