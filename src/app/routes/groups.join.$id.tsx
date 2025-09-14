import { GroupJoinPage } from 'src/pages/groups/join/GroupJoinPage';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { getGroupInfoByInviteKey } from 'src/types';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { accessToken, newSession } = await authenticate(request);

  if (!id) return null;

  const { data } = await getGroupInfoByInviteKey(id, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return json(
    {
      groupInfo: data,
      inviteKey: id,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function GroupsJoin() {
  const { groupInfo, inviteKey } = useLoaderData<typeof loader>();

  return <GroupJoinPage groupInfo={groupInfo} inviteKey={inviteKey} />;
}
