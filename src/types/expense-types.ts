export type Category = {
  id?: number;
  name: string;
  colorHexCode: string;
};

export type PaymentMethod = {
  id?: number;
  name: string;
  paymentType: 'PIX' | 'CARD' | 'CASH';
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

export type ExpenseSum = {
  sum: number;
  paymentMethodName: string;
  paymentMethodId: number;
};
