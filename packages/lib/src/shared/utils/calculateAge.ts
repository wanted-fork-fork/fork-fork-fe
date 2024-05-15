import dayjs from 'configs/dayjs';

export const calculateAge = (birthDate: Date) => {
  return dayjs(Date.now()).diff(birthDate, 'year') + 1;
};
