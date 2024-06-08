import dayjs from 'dayjs';

export const calculateAge = (birthDate: Date) => {
  return dayjs(Date.now()).diff(birthDate, 'year');
};
