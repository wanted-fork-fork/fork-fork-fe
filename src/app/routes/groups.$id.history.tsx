import { GroupHistoryPage } from 'src/pages/groups/history/GroupHistoryPage';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { newSession } = await authenticate(request);

  if (!id) return null;

  return json(
    {
      id,
      historyList: [],
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
