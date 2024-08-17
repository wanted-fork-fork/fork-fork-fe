import { LoaderFunction } from '@remix-run/node';
import { loginKakao } from 'src/types';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { useAuthStore } from 'src/entities/auth/useAuthStore';

export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const code = searchParams.get('code');

  if (!code) {
    throw new Response('', {
      status: 404,
      statusText: '',
    });
  }

  return { code };
};

export default function KakaoAuthPage() {
  const { code } = useLoaderData<typeof loader>();

  useEffect(() => {
    (async () => {
      try {
        const response = await loginKakao({
          code,
        });
        const token = response.accessToken;
        useAuthStore.getState().login(token);
        location.href = '/';
      } catch (e) {
        console.log(e);
        location.href = '/login';
      }
    })();
  }, []);

  return <></>;
}
