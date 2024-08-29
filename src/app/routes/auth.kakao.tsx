import { LoaderFunction, redirect } from '@remix-run/node';
import { loginKakao } from 'src/types';
import { commitSession, getAuthSession } from 'src/app/server/sessions';
import dayjs from 'dayjs';

export const loader: LoaderFunction = async ({ request }) => {
  if (import.meta.env.DEV) {
    const session = await getAuthSession(request);
    session.set('accessToken', process.env.VITE_DEV_JWT_TOKEN ?? '');
    session.set('refreshToken', process.env.VITE_DEV_JWT_TOKEN ?? '');
    session.set('expiredAt', dayjs().add(1, 'day').valueOf().toString());

    return redirect('/', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

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
    session.set('expiredAt', dayjs().add(1, 'day').valueOf().toString());

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
