import { redirect } from '@remix-run/node';
import { commitSession, getAuthSession } from 'src/app/server/sessions';
import dayjs from 'dayjs';
import { refreshToken } from 'src/types';

export const authenticate = async (request: Request) => {
  const session = await getAuthSession(request);
  const expiredAt = session.get('expiredAt');
  const accessToken = session.get('accessToken');

  if (!accessToken) {
    throw redirect('/login');
  }

  if (!expiredAt || dayjs(expiredAt).diff(dayjs(), 'day') > 1) {
    return await requestRefreshToken(request);
  }

  return accessToken;
};

export const requestRefreshToken = async (request: Request) => {
  const session = await getAuthSession(request);
  const { data } = await refreshToken({
    accessToken: session.get('accessToken')!,
    refreshToken: session.get('refreshToken')!,
  });

  session.set('accessToken', data.accessToken);
  session.set('refreshToken', data.refreshToken);

  if (request.method === 'GET')
    throw redirect(request.url, {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });

  return data.accessToken;
};
