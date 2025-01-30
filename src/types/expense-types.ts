export type Category = {
  id?: number;
  name: string;
  colorHexCode: string;
};

export type PaymentType = 'PIX' | 'CREDIT_CARD' | 'CASH' | 'TED' | 'DEBIT_CARD';

export type PaymentMethod = {
  id?: number;
  name: string;
  paymentType: PaymentType;
};

export type Expense = {
  id?: number;
  amount: number;
  description: string;
  date: string;
  categoryId: number;
  paymentMethodId: number;
  installments: number;
  currentInstallment: number;
  paymentMethod?: PaymentMethod;
};

export type ExpenseResponse = {
  expenses: {
    firstInstallment: Expense[];
    remainingInstallments: Expense[];
  };
  totalAmount: number;
};

export type ExpenseSum = {
  sum: number;
  paymentMethodName: string;
  paymentMethodId: number;
};
