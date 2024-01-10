import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const YEAR_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CURRENT_MONTH = format(new Date(), "MMMM");

export const getDateFromISOString = (dateISOString) => {
  console.log("iso: ", dateISOString);
  const date = parseISO(dateISOString);
  const formattedDate = format(date, "dd/MM/yyyy", { locale: ptBR });
  return formattedDate;
};
