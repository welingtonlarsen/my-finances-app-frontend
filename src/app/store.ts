import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from '../features/dashboard/dashboard-slice';
import authReducer from '@/features/auth/slice/auth-slice.ts';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
