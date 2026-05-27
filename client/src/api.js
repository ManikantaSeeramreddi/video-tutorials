import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:10000';

// DEBUG: Log the API URL being used
console.log('API_URL:', BASE_URL);
console.log('REACT_APP_API_URL env var:', process.env.REACT_APP_API_URL);

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add error interceptor for better debugging
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error Response:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url,
      });
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
