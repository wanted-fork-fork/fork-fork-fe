import { GroupHistoryPage } from 'src/pages/groups/history/GroupHistoryPage';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';
import { getGroupHistory } from 'src/types';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { newSession, accessToken } = await authenticate(request);

  if (!id) return null;

  const { data } = await getGroupHistory(id, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    {
      id,
      historyList: data,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function GroupHistory() {
  const { id, historyList } = useLoaderData<typeof loader>();

  return <GroupHistoryPage groupId={id} historyList={historyList} />;
}
