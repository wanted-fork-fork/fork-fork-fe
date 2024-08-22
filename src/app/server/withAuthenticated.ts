import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { refreshToken } from 'src/types';
import { commitSession, getAuthSession } from 'src/app/server/sessions';
import { getRefreshTokenFromHeader } from 'src/app/server/getRefreshToken';
import { AuthorizationError } from 'src/shared/lib/custom_instance';

type Handler<T> = (args: LoaderFunctionArgs | ActionFunctionArgs) => Promise<T>;

type WithAuthenticated = <T>(
  callback: (args: LoaderFunctionArgs | ActionFunctionArgs, accessToken: string) => Promise<T>,
) => Handler<T>;
export const withAuthenticated: WithAuthenticated = <T>(
  callback: (args: LoaderFunctionArgs | ActionFunctionArgs, accessToken: string) => Promise<T>,
) => {
  return async (args: LoaderFunctionArgs | ActionFunctionArgs) => {
    const { request } = args;
    const session = await getAuthSession(request);
    const accessToken = session.get('accessToken');

    if (!accessToken) {
      throw redirect('/login');
    }

    try {
      return await callback(args, accessToken);
    } catch (e) {
      if (e instanceof AuthorizationError) {
        const { data, headers: resHeaders } = await refreshToken({ accessToken: session.get('accessToken')! });
        const accessToken = data.accessToken;
        const newRefreshToken = getRefreshTokenFromHeader(resHeaders);

        if (!newRefreshToken) throw redirect('/login');

        session.set('accessToken', accessToken);
        session.set('refreshToken', newRefreshToken);

        if (request.method === 'GET')
          throw redirect(request.url, {
            headers: {
              'Set-Cookie': await commitSession(session),
            },
          });
        throw e;
      }

      throw e;
    }
  };
};
