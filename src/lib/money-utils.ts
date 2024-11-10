export function formatMoney(value: number) {
  return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}

export function formatMoneyWithoutCents(value: number) {
  return `$${Math.trunc(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}
