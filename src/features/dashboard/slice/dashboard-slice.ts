import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from '@/lib/date-utils';
import {
  fetchCategories,
  fetchPaymentMethods,
  deletePaymentMethod,
  savePaymentMethod,
  saveExpense,
  fetchExpenses,
  deleteExpense,
  fetchExpensesSum,
  saveCategory,
  updateExpense,
} from './dashboard-thunks';
import { DashboardState } from '../types/dashboard-types';

const initialState: DashboardState = {
  categories: {
    data: [],
    status: 'idle',
    saveStatus: 'idle',
    error: null,
  },
  paymentMethods: {
    data: [],
    status: 'idle',
    saveStatus: 'idle',
    deleteStatus: 'idle',
    error: null,
  },
  expenses: {
    data: {
      firstInstallment: [],
      remainingInstallments: [],
      totalAmount: null,
    },
    status: 'idle',
    deletingStatus: 'idle',
    updatingStatus: 'idle',
    error: null,
  },
  expensesSum: {
    data: [],
    status: 'idle',
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
      state.categories.data = action.payload;
      state.categories.status = 'succeeded';
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.categories.status = 'failed';
      state.categories.error = action.error.message || 'Something went wrong';
    });
    // saveCategory
    builder.addCase(saveCategory.pending, (state) => {
      state.categories.saveStatus = 'loading';
    });
    builder.addCase(saveCategory.fulfilled, (state) => {
      state.categories.saveStatus = 'succeeded';
    });
    builder.addCase(saveCategory.rejected, (state, action) => {
      state.categories.error = action.error.message;
      state.categories.saveStatus = 'failed';
    });
    // fetchPaymentMethods
    builder.addCase(fetchPaymentMethods.pending, (state) => {
      state.paymentMethods.status = 'loading';
    });
    builder.addCase(fetchPaymentMethods.fulfilled, (state, action) => {
      state.paymentMethods.data = action.payload;
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
    // updateExpense
    builder.addCase(updateExpense.pending, (state) => {
      state.expenses.updatingStatus = 'loading';
    });
    builder.addCase(updateExpense.fulfilled, (state) => {
      state.expenses.updatingStatus = 'succeeded';
    });
    // fetchExpenses
    builder.addCase(fetchExpenses.pending, (state) => {
      state.expenses.status = 'loading';
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.expenses.data = action.payload;
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
      state.expensesSum.data = action.payload;
      state.expensesSum.status = 'succeeded';
    });
  },
});

export const { setDateFilter } = dashboardSlice.actions;

export default dashboardSlice.reducer;
