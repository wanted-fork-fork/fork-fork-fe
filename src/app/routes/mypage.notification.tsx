import { authenticate } from 'src/app/server/authenticate';
import { info } from 'src/types';
import { json, LoaderFunction } from '@remix-run/node';
import { commitSession } from 'src/app/server/sessions';
import { NotificationConfigPage } from 'src/pages/mypage/notification/NotificationConfigPage';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

  const { data: userInfo } = await info({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    { userInfo },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function MyPage() {
  const { userInfo } = useLoaderData<typeof loader>();

  return <NotificationConfigPage email={userInfo.email} allowEmailNotification={userInfo.receiveEmail} />;
}
