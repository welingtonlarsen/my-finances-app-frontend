import { RootState } from '@/app/redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const getCategories = createSelector(
  (state: RootState) => state.dashboard.categories,
  (categories) => {
    return {
      categories: categories.data,
      isLoading: categories.status === 'loading',
    };
  },
);

export const getPaymentMethods = createSelector(
  (state: RootState) => state.dashboard.paymentMethods,
  (paymentMethods) => ({
    paymentMethods: paymentMethods.data,
    isLoading: paymentMethods.status === 'loading',
    isDeleting: paymentMethods.deleteStatus === 'loading',
  }),
);

export const getExpenses = createSelector(
  (state: RootState) => state.dashboard.expenses,
  (expenses) => ({
    expenses: expenses.data.expenses,
    totalAmount: expenses.data.totalAmount,
    isLoading: expenses.status === 'loading',
    isDeleting: expenses.deletingStatus === 'loading',
  }),
);

export const getExpensesSum = createSelector(
  (state: RootState) => state.dashboard.expensesSum,
  (expensesSum) => ({
    expensesSum: expensesSum.data,
    isLoading: expensesSum.status === 'loading',
  }),
);

export const getDashboardFilters = createSelector(
  (state: RootState) => state.dashboard,
  (dashboard) => dashboard.filters,
);
