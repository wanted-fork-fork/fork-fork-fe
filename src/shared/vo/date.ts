import dayjs from 'dayjs';

export type DateObj = {
  year: number;
  month: number;
  date: number;
};

export const isValidDate = (date: Partial<DateObj>) => {
  return Boolean(date.year && date.month && date.date);
};

export const calculateAge = (birthDate: Date) => {
  return dayjs(Date.now()).diff(birthDate, 'year');
};
