import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, UserDetails } from '@/features/auth/types/auth-types.ts';
import { authenticate } from '@/features/auth/slice/auth-thunks.ts';
import { deleteAuthToken } from '@/lib/local-storage-utils';
import globalRouter from '@/app/router/global-router';

const initialState: AuthState = {
  status: 'idle',
  errorMessage: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    unauthenticate(state) {
      state.token = null;
      deleteAuthToken();
      globalRouter.navigate('/login');
    }
  },
  extraReducers(builder) {
    builder.addCase(authenticate.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.status = 'failed';
      if (typeof action.payload === 'string') {
        state.errorMessage = action.payload;
      } else {
        state.errorMessage = 'Something went wrong';
      }
    });
    builder.addCase(authenticate.fulfilled, (state, action: PayloadAction<UserDetails>) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
    });
  },
});

export const { unauthenticate } = authSlice.actions;

export default authSlice.reducer;
