import axios from 'axios';
import { getToken } from '../utils/token.js';

export const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || 'https://onlyflans-production.up.railway.app';

const http = axios.create({
  baseURL: `${API_ORIGIN}/api`
});

http.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;
