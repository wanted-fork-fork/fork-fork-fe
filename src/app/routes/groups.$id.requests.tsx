import { JoinRequestsPage } from 'src/pages/groups/join_requests/JoinRequestsPage';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';
import { getGroupMembers } from 'src/types';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { accessToken, newSession } = await authenticate(request);

  if (!id) return null;

  const { data } = await getGroupMembers(id, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const pendingMembers = data.filter((member) => member.status === 'PENDING');

  return json(
    {
      groupId: id,
      requestList: pendingMembers,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function GroupJoinRequestsPage() {
  const { groupId, requestList } = useLoaderData<typeof loader>();

  return <JoinRequestsPage groupId={groupId} requestList={requestList} />;
}
