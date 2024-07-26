import { RootState } from '@/app/store';
import { Category, Expense, ExpenseSum, PaymentMethod } from '@/types/expense-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { initialPagination } from '../constants/constants';
import { AxiosInstance } from '@/app/axios-instance';
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from '@/lib/date-utils';

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchCategories = createAsyncThunk('dashboard/fetchCategories', async () => {
  const response = await AxiosInstance.Authenticated.get<Category[]>('/category');
  return response;
});

export const fetchPaymentMethods = createAsyncThunk('dashboard/fetchPaymentMethods', async () => {
  const response = await AxiosInstance.Authenticated.get<PaymentMethod[]>('/paymentmethod');
  return response;
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
    return response;
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
    return response;
  },
);

export const fetchExpensesSum = createAsyncThunk(
  'dashboard/fetchExpensesSum',
  async ({ from, to }: { from: string; to: string }) => {
    const response = await AxiosInstance.Authenticated.get<ExpenseSum[]>('/expenses/sum', { from, to });
    return response;
  },
);

export const saveExpense = createAsyncThunk(
  'dashboard/saveExpense',
  async (expense: Expense, { dispatch, getState }) => {
    const response = await AxiosInstance.Authenticated.post<Expense, Expense>('/expense', expense);
    const state = getState() as RootState;
    await dispatch(fetchExpenses({ ...initialPagination, ...state.dashboard.filters.date })).unwrap();
    dispatch(fetchExpensesSum(state.dashboard.filters.date));
    return response;
  },
);

export const deleteExpense = createAsyncThunk('dashboard/deleteExpense', async (id: number, { dispatch, getState }) => {
  await AxiosInstance.Authenticated.deleteRequest(`/expense/${id}`);
  const state = getState() as RootState;
  dispatch(fetchExpenses({ ...initialPagination, ...state.dashboard.filters.date }));
});

type TState = {
  categories: {
    data: Category[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  paymentMethods: {
    data: PaymentMethod[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    saveStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    deleteStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  expenses: {
    data: {
      expenses: Expense[];
      totalAmount: number | null;
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    deletingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  expensesSum: {
    data: ExpenseSum[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };
  filters: {
    date: {
      from: string;
      to: string;
    };
  };
};

const initialState: TState = {
  categories: {
    data: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  paymentMethods: {
    data: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    saveStatus: 'idle',
    deleteStatus: 'idle',
    error: null,
  },
  expenses: {
    data: {
      expenses: [],
      totalAmount: null,
    },
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    deletingStatus: 'idle',
    error: null,
  },
  expensesSum: {
    data: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  filters: {
    date: {
      from: getFirstDayOfCurrentMonth().toISOString(),
      to: getLastDayOfCurrentMonth().toISOString(),
    },
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setDateFilter(state, action: PayloadAction<{ from: string; to: string }>) {
      state.filters.date = action.payload;
    },
  },
  extraReducers(builder) {
    // fetchCategories
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories.status = 'loading';
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories.data = action.payload.data;
      state.categories.status = 'succeeded';
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories.status = 'failed';
      state.categories.error = action.error.message || 'Something went wrong';
    });
    // fetchPaymentMethods
    builder.addCase(fetchPaymentMethods.pending, (state) => {
      state.paymentMethods.status = 'loading';
    });
    builder.addCase(fetchPaymentMethods.fulfilled, (state, action) => {
      state.paymentMethods.data = action.payload.data;
      state.paymentMethods.status = 'succeeded';
    });
    builder.addCase(fetchPaymentMethods.rejected, (state, action) => {
      state.paymentMethods.status = 'failed';
      state.paymentMethods.error = action.error.message || 'Something went wrong';
    });
    // deletePaymentMethod
    builder.addCase(deletePaymentMethod.pending, (state) => {
      state.paymentMethods.deleteStatus = 'loading';
    });
    builder.addCase(deletePaymentMethod.fulfilled, (state) => {
      state.paymentMethods.deleteStatus = 'succeeded';
    });
    // savePaymentMethod
    builder.addCase(savePaymentMethod.pending, (state) => {
      state.paymentMethods.saveStatus = 'loading';
    });
    builder.addCase(savePaymentMethod.fulfilled, (state) => {
      state.paymentMethods.saveStatus = 'succeeded';
    });
    // saveExpense
    builder.addCase(saveExpense.pending, (state) => {
      state.expenses.status = 'loading';
    });
    builder.addCase(saveExpense.fulfilled, (state) => {
      state.expenses.status = 'succeeded';
    });
    // fetchExpenses
    builder.addCase(fetchExpenses.pending, (state) => {
      state.expenses.status = 'loading';
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.expenses.data = action.payload.data;
      state.expenses.status = 'succeeded';
    });
    // deleteExpense
    builder.addCase(deleteExpense.pending, (state) => {
      state.expenses.deletingStatus = 'loading';
    });
    builder.addCase(deleteExpense.rejected, (state, action) => {
      state.expenses.deletingStatus = 'failed';
    });
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      state.expenses.deletingStatus = 'succeeded';
    });
    // fetchExpensesSum
    builder.addCase(fetchExpensesSum.pending, (state) => {
      state.expensesSum.status = 'loading';
    });
    builder.addCase(fetchExpensesSum.fulfilled, (state, action) => {
      state.expensesSum.data = action.payload.data;
      state.expensesSum.status = 'succeeded';
    });
  },
});

export const { setDateFilter } = dashboardSlice.actions;

export const getCategories = (state: RootState) => {
  return {
    categories: state.dashboard.categories.data,
    isLoading: state.dashboard.categories.status === 'loading',
  };
};

export const getPaymentMethods = (state: RootState) => {
  return {
    paymentMethods: state.dashboard.paymentMethods.data,
    isLoading: state.dashboard.paymentMethods.status === 'loading',
    isDeleting: state.dashboard.paymentMethods.deleteStatus === 'loading',
  };
};

export const getExpenses = (state: RootState) => {
  return {
    expenses: state.dashboard.expenses.data.expenses,
    totalAmount: state.dashboard.expenses.data.totalAmount,
    isLoading: state.dashboard.expenses.status === 'loading',
    isDeleting: state.dashboard.expenses.deletingStatus === 'loading',
  };
};

export const getExpensesSum = (state: RootState) => {
  return {
    expensesSum: state.dashboard.expensesSum.data,
    isLoading: state.dashboard.expensesSum.status === 'loading',
  };
};

export const getDashboardFilters = (state: RootState) => {
  return state.dashboard.filters;
};

export default dashboardSlice.reducer;
