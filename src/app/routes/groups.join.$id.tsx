import { GroupJoinPage } from 'src/pages/groups/join/GroupJoinPage';
import { json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { authenticateWithoutRedirection } from 'src/app/server/authenticate';
import { getGroupInfoByInviteKey, ValidateGroupInviteLinkResponseReason } from 'src/types';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { ErrorPage } from 'src/pages/error/ErrorPage';
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

  return json({
    groupInfo: data,
    inviteKey: id,
    isUser: Boolean(accessToken),
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
  const { groupInfo, inviteKey, isUser } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!groupInfo.reason) {
      return;
    }

    switch (groupInfo.reason as ValidateGroupInviteLinkResponseReason) {
      case 'ALREADY_ADMIN':
      case 'ALREADY_MEMBER':
        toast('이미 참여한 그룹입니다.');
        navigate(`/groups/${groupInfo.groupId}`);
        break;
      case 'ALREADY_PENDING':
        toast('이미 참여 신청을 완료한 그룹입니다.\n그룹장의 수락을 기다려주세요.');
        navigate('/groups');
        break;
    }
  }, [groupInfo.groupId, groupInfo.reason, navigate]);

  if (groupInfo.reason) {
    switch (groupInfo.reason as ValidateGroupInviteLinkResponseReason) {
      case 'INVITE_LINK_NOT_FOUND':
        return (
          <ErrorPage
            title={'잘못된 접근입니다.'}
            description={'그룹 초대자에게 참여 링크를 다시 요청하세요.'}
            buttonText={'메인으로 이동'}
            buttonLink={'/'}
          />
        );
      case 'GROUP_NOT_FOUND':
        return (
          <ErrorPage
            title={'그룹이 삭제되었습니다.'}
            description={`그룹이 삭제되어 참여할 수 없습니다.\n그룹 초대자에게 문의하세요.`}
            buttonText={'메인으로 이동'}
            buttonLink={'/'}
          />
        );
      case 'ALREADY_PENDING':
      case 'ALREADY_MEMBER':
      case 'ALREADY_ADMIN':
      default:
        return null;
    }
  }

  return <GroupJoinPage groupInfo={groupInfo} inviteKey={inviteKey} isUser={isUser} />;
}
