import { redirect } from '@remix-run/node';
import { commitSession, getAuthSession } from 'src/app/server/sessions';
import dayjs from 'dayjs';
import { AuthorizationError } from 'src/shared/lib/custom_instance';
import { AxiosError } from 'axios';
import { refreshToken } from 'src/types';

class UnauthorizedError extends Error {
  message = 'unauthorized';
}

export const authenticate = async (request: Request) => {
  const session = await getAuthSession(request);
  const expiredAt = session.get('expiredAt');
  const accessToken = session.get('accessToken');

  try {
    if (!accessToken) {
      throw redirect('/login');
    }

    if (!expiredAt || dayjs(expiredAt).diff(dayjs(), 'day') > 1) {
      throw new UnauthorizedError();
    }

    return accessToken;
  } catch (e) {
    if (
      e instanceof AuthorizationError ||
      (((e: unknown): e is AxiosError => e instanceof AxiosError)(e) && e.status === 401)
    ) {
      await requestRefreshToken(request);
    }
  }
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
