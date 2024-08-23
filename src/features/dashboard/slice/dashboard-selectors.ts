import { RootState } from '@/app/redux/store';

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
