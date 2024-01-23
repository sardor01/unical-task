import axios from 'axios';
import { TokenManager } from './auth';

const baseURL = 'https://dummyjson.com';

export const httpClient = axios.create({ baseURL });

export const httpClientWithToken = axios.create({ baseURL });

httpClientWithToken.interceptors.request.use(
  (config) => {
    const token = TokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
