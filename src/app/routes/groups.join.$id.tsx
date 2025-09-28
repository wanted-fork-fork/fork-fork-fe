import { GroupJoinPage } from 'src/pages/groups/join/GroupJoinPage';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
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

export const meta: MetaFunction = ({ data }) => {
  return [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { title: `[구구] ${data.groupInfo.groupName}에 참여해주세요.` },
    { property: 'og:image', content: 'https://www.meetgoogoo.com/images/meta_join.png' },
    { property: 'og:image:width', content: '800' },
    { property: 'og:image:height', content: '400' },
  ];
};

export default function GroupsJoin() {
  const { groupInfo, inviteKey } = useLoaderData<typeof loader>();

  return <GroupJoinPage groupInfo={groupInfo} inviteKey={inviteKey} />;
}
