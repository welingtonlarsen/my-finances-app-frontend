import { AsyncThunkPayloadCreator, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Credentials, UserDetails } from '@/features/auth/types/auth-types.ts';
import globalRouter from '@/app/router/global-router.ts';

const BASE_URL = import.meta.env.VITE_API_URL;

export const authenticate = createAsyncThunk<UserDetails, Credentials>(
  'auth/authenticate',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<UserDetails>(`${BASE_URL}/users/authenticate`, credentials);
      globalRouter.navigate('/');
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.status === 401) {
          return rejectWithValue('Invalid credentials');
        }
      }
      return rejectWithValue('Something went wrong');
    }
  },
);
