import { format } from "date-fns";

export const YEAR_MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const CURRENT_MONTH = format(new Date(), 'MMMM');