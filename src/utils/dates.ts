import moment from "moment";

export const formattedDate = (date: string) => moment(date).format("DD/MM/YYYY hh:mm");