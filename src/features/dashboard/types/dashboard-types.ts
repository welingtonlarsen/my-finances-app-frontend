import { Category, Expense, ExpenseSum, PaymentMethod } from '@/types/expense-types';
import { StateStatus } from '@/types/state-types';

export type DashboardState = {
  categories: {
    data: Category[];
    status: StateStatus;
    error: string | null;
  };
  paymentMethods: {
    data: PaymentMethod[];
    status: StateStatus;
    saveStatus: StateStatus;
    deleteStatus: StateStatus;
    error: string | null;
  };
  expenses: {
    data: {
      firstInstallment: Expense[];
      remainingInstallments: Expense[];
      totalAmount: number | null;
    };
    status: StateStatus;
    deletingStatus: StateStatus;
    error: string | null;
  };
  expensesSum: {
    data: ExpenseSum[];
    status: StateStatus;
    error: string | null;
  };
  filters: {
    date: {
      from: string;
      to: string;
    };
  };
};
