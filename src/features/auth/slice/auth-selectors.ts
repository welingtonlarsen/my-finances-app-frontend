import { RootState } from '@/app/redux/store';

export const isLoading = (state: RootState) => {
  return state.auth.status === 'loading';
};

export const getError = (state: RootState) => {
  return {
    isError: state.auth.status === 'failed',
    errorMessage: state.auth.errorMessage,
  };
};
