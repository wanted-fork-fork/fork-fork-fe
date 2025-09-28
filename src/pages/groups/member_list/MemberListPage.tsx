import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link, useRevalidator } from '@remix-run/react';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { MemberRow } from 'src/entities/groups/components/member_row/MemberRow';
import { Button } from 'src/shared/ui/Button/Button';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';
import toast from 'react-hot-toast';
import styles from './MemberListPage.module.css';
import { GroupInfoResponse, GroupMemberResponse, manageMember } from 'src/types';
import { useState } from 'react';

export const MemberListPage = ({
  group,
  memberList,
  isAdmin,
}: {
  group: GroupInfoResponse;
  memberList: GroupMemberResponse[];
  isAdmin: boolean;
}) => {
  const revalidator = useRevalidator();
  const [outConfirmUser, setOutConfirmUser] = useState<string | null>(null);

  const handleConfirmOut = async () => {
    if (!outConfirmUser) return;

    await manageMember(group.groupId, outConfirmUser, { action: 'KICK' });

    toast.success('참여자를 그룹에서 내보냈습니다.');
    setOutConfirmUser(null);

    revalidator.revalidate();
  };

  return (
    <div className={styles.Container}>
      <Header
        prefixSlot={
          <Link to={`/groups/${group.groupId}/info`}>
            <ArrowLeft color={Theme.color.neutral50} />
          </Link>
        }
      >
        참여자 목록
      </Header>
      <div>
        {memberList.map((member) => (
          <MemberRow
            key={member.userId}
            member={member}
            suffix={
              isAdmin &&
              member.status !== 'ADMIN' && (
                <Button
                  size={'S'}
                  color={'neutral'}
                  variant={'outline'}
                  onClick={() => setOutConfirmUser(member.userId)}
                >
                  내보내기
                </Button>
              )
            }
          />
        ))}
      </div>
      <ConfirmModal
        show={!!outConfirmUser}
        title={'참여자를 그룹에서 내보낼까요?'}
        description={'공유한 후보자 정보는 함께 삭제돼요.\n참여자는 다시 초대할 수 있어요.'}
        confirmText={'확인'}
        cancelText={'취소'}
        onConfirm={handleConfirmOut}
        onCancel={() => setOutConfirmUser(null)}
      />
    </div>
  );
};
