import { GroupInfoPage } from 'src/pages/groups/group_info/GroupInfoPage';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';
import { getGroupInfo } from 'src/types';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { newSession, accessToken } = await authenticate(request);

  if (!id) return null;

  const { data } = await getGroupInfo(id, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    {
      groupInfo: data,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function GroupDetailPage() {
  const { groupInfo } = useLoaderData<typeof loader>();

  return <GroupInfoPage groupInfo={groupInfo} />;
}
