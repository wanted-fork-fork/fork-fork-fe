import { LoaderFunction, redirect } from '@remix-run/node';
import { loginKakao } from 'src/types';
import { commitSession, getAuthSession } from 'src/app/server/sessions';
import { authenticate } from 'src/app/server/authenticate';
import { getRefreshTokenFromHeader } from 'src/app/server/getRefreshToken';

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const code = searchParams.get('code');

  if (!code) {
    throw new Response('', {
      status: 404,
      statusText: '',
    });
  }

  try {
    const { data, headers } = await loginKakao({ code });

    const refreshToken = getRefreshTokenFromHeader(headers);
    if (!refreshToken) return redirect('/login');

    const session = await getAuthSession(request);
    session.set('accessToken', data.accessToken);
    session.set('refreshToken', refreshToken);

    const token = await authenticate(request, session, request.headers);
    if (token) {
      return redirect('/', {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    }

    return redirect('/login');
  } catch (e) {
    console.error(e);
    return redirect('/login');
  }
};

export default function KakaoAuthPage() {
  return <></>;
}
