import axios from 'axios';
import globalRouter from './global-router';
import { getAuthToken } from '@/lib/local-storage-utils';

const BASE_URL = import.meta.env.VITE_API_URL;

// instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// interceptors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.log('Unauthorized');
      globalRouter.navigate('/login');
    }
    return error;
  },
);

// authenticated methods
export namespace AxiosInstance {
  export namespace Authenticated {
    export function get<T>(path: string, params?: any) {
      return axios.get<T>(`${BASE_URL}${path}`, { headers: { Authorization: `Bearer ${getAuthToken()}` }, params });
    }
  }
}
