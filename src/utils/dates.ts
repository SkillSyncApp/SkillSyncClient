import moment from "moment";

export const isToday = (date: Date | string) =>
  moment(date).isSame(moment(), "day");

export const formattedDate = (date: string | Date, fullDate = true) =>
  moment(date).format(`${fullDate ? "DD/MM/YYYY " : ""}HH:mm`);
