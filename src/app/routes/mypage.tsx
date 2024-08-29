import { MyPage as _MyPage } from 'src/pages/mypage/MyPage';
import { authenticate } from 'src/app/server/authenticate';
import { info } from 'src/types';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';

export const loader: LoaderFunction = async ({ request }) => {
  const accessToken = await authenticate(request);

  const { data: userInfo } = await info({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { userInfo };
};

export default function MyPage() {
  const { userInfo } = useLoaderData<typeof loader>();
  return <_MyPage userInfo={userInfo} />;
}
