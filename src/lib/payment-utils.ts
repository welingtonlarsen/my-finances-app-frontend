export function getSVGOfPaymentMethod(paymentMethod: string) {
  switch (paymentMethod) {
    case 'PIX':
      return '/public/payment/pix.png';
    case 'CASH':
      return '/public/payment/money.png';
    case 'CARD':
    case 'CREDIT_CARD':
      return '/public/payment/card.png';
    default:
      return '';
  }
}
