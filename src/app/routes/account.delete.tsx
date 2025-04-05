import { authenticate } from 'src/app/server/authenticate';
import { info } from 'src/types';
import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { commitSession } from 'src/app/server/sessions';
import { AccountDeletePage } from 'src/pages/auth/account_delete/AccountDeletePage';

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

export default function AccountDelete() {
  const { userInfo } = useLoaderData<typeof loader>();
  return <AccountDeletePage userInfo={userInfo} />;
}
