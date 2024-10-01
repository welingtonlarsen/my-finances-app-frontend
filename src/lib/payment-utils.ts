import { PaymentType } from '@/types/expense-types';

export const INSTALLMENTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const PAYMENT_TYPES: { title: string; paymentType: PaymentType }[] = [
  { title: 'Credit Card', paymentType: 'CREDIT_CARD' },
  { title: 'PIX', paymentType: 'PIX' },
  { title: 'Cash', paymentType: 'CASH' },
  { title: 'TED', paymentType: 'TED' },
  { title: 'Debit Card', paymentType: 'DEBIT_CARD' },
];

export function getSVGOfPaymentMethod(paymentMethod: string) {
  switch (paymentMethod) {
    case 'PIX':
      return '/payment/pix.png';
    case 'CASH':
      return '/payment/money.png';
    case 'CARD':
    case 'CREDIT_CARD':
      return '/payment/card.png';
    default:
      return '';
  }
}
