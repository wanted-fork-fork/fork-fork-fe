import dayjs from 'dayjs';

export type DateObj = {
  year: number;
  month: number;
  date: number;
};

export const isValidDate = (date: Partial<DateObj>) => {
  return Boolean(date.year && date.month && date.date);
};

export const convertDateObjectToDate = ({ year, month, date }: Partial<DateObj>) => {
  if (!year || !month || !date) return new Date();

  return new Date(`${year}-${month}-${date}`);
};

export const convertDateToDateObject = (date: Date): DateObj => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };
};

export const calculateAge = (birthDate: Date) => {
  return dayjs(Date.now()).diff(birthDate, 'year');
};
