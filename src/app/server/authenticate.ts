import { redirect } from '@remix-run/node';
import { refreshToken } from 'src/types';
import { AuthSession, commitSession } from 'src/app/server/sessions';
import { getRefreshTokenFromHeader } from 'src/app/server/getRefreshToken';

class AuthorizationError extends Error {}

export const authenticate = async (request: Request, session: AuthSession, headers = new Headers()) => {
  try {
    const accessToken = session.get('accessToken');

    if (!accessToken) {
      throw redirect('/login');
    }

    return accessToken;
  } catch (e) {
    if (e instanceof AuthorizationError) {
      const { data, headers: resHeaders } = await refreshToken({ accessToken: session.get('accessToken')! });
      const accessToken = data.accessToken;
      const newRefreshToken = getRefreshTokenFromHeader(resHeaders);

      if (!newRefreshToken) throw e;

      session.set('accessToken', accessToken);
      session.set('refreshToken', newRefreshToken);

      headers.append('Set-Cookie', await commitSession(session));

      if (request.method === 'GET') throw redirect(request.url, { headers });

      return accessToken;
    }

    throw e;
  }
};
