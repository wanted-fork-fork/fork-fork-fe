import { MyPage as _MyPage } from 'src/pages/mypage/MyPage';
import { withAuthenticated } from 'src/app/server/withAuthenticated';
import { info } from 'src/types';
import { useLoaderData } from '@remix-run/react';

export const loader = withAuthenticated(async (_, accessToken) => {
  const { data: userInfo } = await info({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return { userInfo };
});

export default function MyPage() {
  const { userInfo } = useLoaderData<typeof loader>();
  return <_MyPage userInfo={userInfo} />;
}
