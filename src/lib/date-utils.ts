import { format } from 'date-fns';

export function formatDateToYearMonthDay(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getUTCMonth()}/${date.getUTCDate()}`;
}

export function getTodayString() {
  const today = new Date();
  return format(today, 'yyyy-MM-dd');
}
