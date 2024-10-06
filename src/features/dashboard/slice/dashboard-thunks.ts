import { AxiosInstance } from '@/app/axios/axios-instance';
import { RootState } from '@/app/redux/store';
import { Category, PaymentMethod, Expense, ExpenseSum } from '@/types/expense-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { initialPagination } from '../constants/constants';

export const fetchCategories = createAsyncThunk('dashboard/fetchCategories', async () => {
  const response = await AxiosInstance.Authenticated.get<Category[]>('/category');
  return response.data;
});

export const fetchPaymentMethods = createAsyncThunk('dashboard/fetchPaymentMethods', async () => {
  const response = await AxiosInstance.Authenticated.get<PaymentMethod[]>('/paymentmethod');
  return response.data;
});

export const deletePaymentMethod = createAsyncThunk(
  'dashboard/deletePaymentMethod',
  async (id: number, { dispatch, getState }) => {
    await AxiosInstance.Authenticated.deleteRequest(`/paymentmethod/${id}`);

    const state = getState() as RootState;

    dispatch(fetchPaymentMethods());
    dispatch(fetchExpenses({ ...initialPagination, ...state.dashboard.filters.date }));
    dispatch(fetchExpensesSum(state.dashboard.filters.date));
  },
);

export const savePaymentMethod = createAsyncThunk(
  'dashboard/savePaymentMethod',
  async (paymentMethod: PaymentMethod, { dispatch, getState }) => {
    const response = await AxiosInstance.Authenticated.post<PaymentMethod, PaymentMethod>(
      '/paymentmethod',
      paymentMethod,
    );
    dispatch(fetchPaymentMethods());
    const state = getState() as RootState;
    dispatch(fetchExpensesSum(state.dashboard.filters.date));
    return response.data;
  },
);

export const fetchExpenses = createAsyncThunk(
  'dashboard/fetchExpenses',
  async ({ page, size, from, to }: { page: number; size: number; from: string; to: string }) => {
    const response = await AxiosInstance.Authenticated.get<{ expenses: Expense[]; totalAmount: number }>('/expense', {
      page,
      size,
      from,
      to,
    });
    return response.data;
  },
);

export const fetchExpensesSum = createAsyncThunk(
  'dashboard/fetchExpensesSum',
  async ({ from, to }: { from: string; to: string }) => {
    const response = await AxiosInstance.Authenticated.get<ExpenseSum[]>('/expenses/sum', { from, to });
    return response.data;
  },
);

export const saveExpense = createAsyncThunk(
  'dashboard/saveExpense',
  async (expense: Expense, { dispatch, getState }) => {
    const response = await AxiosInstance.Authenticated.post<Expense, Expense>('/expense', expense);
    const state = getState() as RootState;
    await dispatch(fetchExpenses({ ...initialPagination, ...state.dashboard.filters.date })).unwrap();
    dispatch(fetchExpensesSum(state.dashboard.filters.date));
    return response.data;
  },
);

export const deleteExpense = createAsyncThunk('dashboard/deleteExpense', async (id: number, { dispatch, getState }) => {
  await AxiosInstance.Authenticated.deleteRequest(`/expense/${id}`);
  const state = getState() as RootState;
  dispatch(fetchExpenses({ ...initialPagination, ...state.dashboard.filters.date }));
});
