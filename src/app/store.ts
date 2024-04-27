import { configureStore } from '@reduxjs/toolkit'
import dashboardReducer from '../features/dashboard/dashboard-slice'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;