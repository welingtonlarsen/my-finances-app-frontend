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
