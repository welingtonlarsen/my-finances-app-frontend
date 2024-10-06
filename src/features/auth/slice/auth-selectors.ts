import { RootState } from '@/app/redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const isLoading = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.status === 'loading',
);

export const getError = createSelector(
  (state: RootState) => state.auth,
  (auth) => ({ isError: auth.status === 'failed', errorMessage: auth.errorMessage }),
);
