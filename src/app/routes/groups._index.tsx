import { GroupListPage } from 'src/pages/groups/group_list/GroupListPage';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { getMyGroups, info } from 'src/types';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

  const { data: userInfo } = await info({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const { data: groupList } = await getMyGroups({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    {
      userInfo,
      groupList,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function _GroupListPage() {
  const { userInfo, groupList } = useLoaderData<typeof loader>();

  return <GroupListPage userInfo={userInfo} groupList={groupList} />;
}
