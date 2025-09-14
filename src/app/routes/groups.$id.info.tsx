import { GroupInfoPage } from 'src/pages/groups/group_info/GroupInfoPage';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';
import { getGroupInfo, info } from 'src/types';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { newSession, accessToken } = await authenticate(request);

  if (!id) return null;

  const { data: userInfo } = await info({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { data } = await getGroupInfo(id, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    {
      userId: userInfo.userId,
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
  const { groupInfo, userId } = useLoaderData<typeof loader>();

  return <GroupInfoPage userId={userId} groupInfo={groupInfo} />;
}
