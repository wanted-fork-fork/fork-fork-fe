import { GroupJoinPage } from 'src/pages/groups/join/GroupJoinPage';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { authenticateWithoutRedirection, redirectToLoginPage } from 'src/app/server/authenticate';
import { getGroupInfoByInviteKey } from 'src/types';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { isbot } from 'isbot';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const loader: LoaderFunction = async ({ request, params }) => {
  const { id } = params;
  const res = await authenticateWithoutRedirection(request);
  const accessToken = res?.accessToken;

  if (!id) return null;

  const { data } = await getGroupInfoByInviteKey(id, {
    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : '' },
  });

  if (data.isValid) {
    return json({
      groupInfo: data,
      inviteKey: id,
    });
  }

  if (isbot(request.headers.get('User-Agent') || '')) {
    return json({
      groupInfo: data,
      inviteKey: id,
    });
  }

  if (!data.reason) {
    redirectToLoginPage(`/groups/join/${id}`);
    return;
  }

  return json({
    groupInfo: data,
    inviteKey: id,
  });
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
  const navigate = useNavigate();

  useEffect(() => {
    if (groupInfo.isValid) {
      return;
    }

    toast(groupInfo.reason);

    if (groupInfo.reason.includes('참여 신청')) {
      navigate(`/groups`, { replace: true });
      return;
    }

    navigate(`/groups/${groupInfo.groupId}`, { replace: true });
  }, [groupInfo.groupId, groupInfo.isValid, groupInfo.reason, navigate]);

  if (!groupInfo.isValid) {
    return null;
  }

  return <GroupJoinPage groupInfo={groupInfo} inviteKey={inviteKey} />;
}
