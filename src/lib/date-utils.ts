import { format } from 'date-fns';

export function formatDateToYearMonthDay(dateString: string) {
  const date = new Date(dateString);
  return format(date, 'yyyy/MM/dd');
}
