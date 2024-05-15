import dayjs from '@repo/config-dayjs';

export const calculateAge = (birthDate: Date) => {
  return dayjs(Date.now()).diff(birthDate, 'year') + 1;
};
