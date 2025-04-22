/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
import globalRouter from '../router/global-router';
import { deleteAuthToken, getAuthToken } from '@/lib/local-storage-utils';

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
      deleteAuthToken();
      globalRouter.navigate('/login');
    }
    return error;
  },
);

// authenticated methods
export namespace AxiosInstance {
  export namespace Authenticated {
    export function get<T>(path: string, params?: any) {
      return axiosInstance.get<T>(`${BASE_URL}${path}`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
        params,
      });
    }

    export function post<T, K>(path: string, data: K) {
      return axiosInstance.post<T>(`${BASE_URL}${path}`, data, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
    }

    export function deleteRequest<T>(path: string) {
      return axiosInstance.delete<T>(`${BASE_URL}${path}`, { headers: { Authorization: `Bearer ${getAuthToken()}` } });
    }

    export function patch<T, K>(path: string, resouceId: number | string, data: K) {
      return axiosInstance.patch<T>(`${BASE_URL}${path}/${resouceId}`, data, {
        headers: { Authorization: `Bearer ${getAuthToken()}` },
      });
    }
  }
}
