import { AxiosResponseHeaders } from 'axios';

export const getRefreshTokenFromHeader = (headers: Pick<AxiosResponseHeaders, 'set-cookie'>) => {
  return headers['set-cookie']
    ?.find((s) => s.includes('refreshToken'))
    ?.split('; ')
    .find((s) => s.startsWith('refreshToken'))
    ?.replace('refreshToken=', '');
};
