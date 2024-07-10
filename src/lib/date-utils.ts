import { format, set } from 'date-fns';

export function formatDateToYearMonthDay(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
}

export function getTodayString() {
  const today = new Date();
  return format(today, 'yyyy-MM-dd');
}

export function getFirstDayOfCurrentMonth() {
  const now = new Date();
  const firstDayOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  return firstDayOfMonth;
}

export function getLastDayOfCurrentMonth() {
  const now = new Date();
  const firstDayOfNextMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  const lastDayOfMonth = new Date(firstDayOfNextMonth.getTime() - 1 * 24 * 60 * 60 * 1000);
  return lastDayOfMonth;
}

export function createDateFromISOString(isoString: string) {
  const date = new Date(isoString);
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset);
}

export function toISOString(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS");
}

export function toISOStringEndOfDay(date: Date) {
  const endOfDay = set(date, { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 });
  return format(endOfDay, "yyyy-MM-dd'T'HH:mm:ss.SSS");
}
