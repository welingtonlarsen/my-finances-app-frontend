import { RootState } from '@/app/store';
import { Category, Expense, PaymentMethod } from '@/types/expense-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCategories = createAsyncThunk('dashboard/fetchCategories', async () => {
  const response = await axios.get<Category[]>('http://localhost:3000/category');
  return response;
});

export const fetchPaymentMethods = createAsyncThunk('dashboard/fetchPaymentMethods', async () => {
  const response = await axios.get<PaymentMethod[]>('http://localhost:3000/paymentmethod');
  return response;
});

export const fetchExpenses = createAsyncThunk(
  'dashboard/fetchExpenses',
  async ({ page, size }: { page: number; size: number }) => {
    const response = await axios.get<{ expenses: Expense[]; totalAmount: number }>('http://localhost:3000/expense', {
      params: { page, size },
    });
    return response;
  },
);

export const saveExpense = createAsyncThunk('dashboard/saveExpense', async (expense: Expense, { dispatch }) => {
  const response = await axios.post<Expense>('http://localhost:3000/expense', expense);
  await dispatch(fetchExpenses({ page: 1, size: 4 })).unwrap();
  return response;
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
    error: string | null;
  };
  expenses: {
    data: {
      expenses: Expense[];
      totalAmount: number | null;
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
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
    error: null,
  },
  expenses: {
    data: {
      expenses: [],
      totalAmount: null,
    },
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
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
  },
});

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
  };
};

export const getExpenses = (state: RootState) => {
  return {
    expenses: state.dashboard.expenses.data.expenses,
    totalAmount: state.dashboard.expenses.data.totalAmount,
    isLoading: state.dashboard.expenses.status === 'loading',
  };
};

export default dashboardSlice.reducer;
