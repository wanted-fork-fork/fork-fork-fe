import { LoaderFunction, redirect } from '@remix-run/node';
import { loginKakao } from 'src/types';
import { commitSession, generateExpiredDate, getAuthSession } from 'src/app/server/sessions';

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
    const { data } = await loginKakao({ code });

    const session = await getAuthSession(request);
    session.set('accessToken', data.accessToken);
    session.set('refreshToken', data.refreshToken);
    session.set('expiredAt', generateExpiredDate());

    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (e) {
    console.error(e);
    return redirect('/login');
  }
};

export default function KakaoAuthPage() {
  return <></>;
}
