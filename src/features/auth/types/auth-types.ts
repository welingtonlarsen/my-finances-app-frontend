import { StateStatus } from '@/types/state-types.ts';

export type AuthState = {
  status: StateStatus;
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
