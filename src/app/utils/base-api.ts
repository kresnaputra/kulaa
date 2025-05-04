import axios from 'axios';

const baseURL = 'https://backend.kulaa.co.uk';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;