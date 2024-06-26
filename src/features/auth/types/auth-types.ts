import { Status } from '@/types/state-types.ts';

export type AuthState = {
  status: Status;
  errorMessage: string;
  token: string;
};

export type Credentials = {
  email: string;
  password: string;
};

export type UserDetails = {
  token: string;
};
