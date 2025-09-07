import { MemberListPage } from 'src/pages/groups/member_list/MemberListPage';
import { json, LoaderFunction } from '@remix-run/node';
import { authenticate } from 'src/app/server/authenticate';
import { getGroupInfo, getGroupMembers } from 'src/types';
import { commitSession } from 'src/app/server/sessions';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const { accessToken, newSession } = await authenticate(request);

  if (!id) return null;

  const { data } = await getGroupMembers(id, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const { data: groupInfo } = await getGroupInfo(id, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return json(
    {
      members: data,
      groupInfo,
    },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function GroupMemberListPage() {
  const { members, groupInfo } = useLoaderData<typeof loader>();

  return <MemberListPage memberList={members} group={groupInfo} isAdmin={groupInfo.myStatus === 'ADMIN'} />;
}
