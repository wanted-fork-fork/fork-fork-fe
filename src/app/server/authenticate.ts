import { redirect } from '@remix-run/node';
import { destroySession, generateExpiredDate, getAuthSession, isDateExpired } from 'src/app/server/sessions';
import { refreshToken } from 'src/types';

export const authenticate = async (request: Request) => {
  const result = await authenticateWithoutRedirection(request);
  if (!result) {
    throw redirect('/login');
  }
  return result;
};

export const authenticateWithoutRedirection = async (request: Request) => {
  const session = await getAuthSession(request);
  const expiredAt = session.get('expiredAt');
  const accessToken = session.get('accessToken');

  if (!accessToken) {
    return null;
  }

  if (!expiredAt || isDateExpired(expiredAt)) {
    const { data } = await requestRefreshToken(request);

    session.set('accessToken', data.accessToken);
    session.set('refreshToken', data.refreshToken);
    session.set('expiredAt', generateExpiredDate());

    return { accessToken: data.accessToken, newSession: session };
  }

  return { accessToken };
};

export const requestRefreshToken = async (request: Request) => {
  const session = await getAuthSession(request);
  try {
    const { data } = await refreshToken({
      accessToken: session.get('accessToken')!,
      refreshToken: session.get('refreshToken')!,
    });

    return { data };
  } catch (e) {
    throw redirect('/login', {
      headers: {
        'Set-Cookie': await destroySession(session),
      },
    });
  }
};
