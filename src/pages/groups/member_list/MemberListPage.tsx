import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link } from '@remix-run/react';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { GroupMember, GroupSummary } from 'src/entities/groups/mocks/groupInfoMock';
import { MemberRow } from 'src/entities/groups/components/member_row/MemberRow';
import { Button } from 'src/shared/ui/Button/Button';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';
import toast from 'react-hot-toast';
import styles from './MemberListPage.module.css';

export const MemberListPage = ({
  group,
  memberList,
  isAdmin,
}: {
  group: GroupSummary;
  memberList: GroupMember[];
  isAdmin: boolean;
}) => {
  const { value: isOutConfirmOpen, setTrue: openOutConfirm, setFalse: closeOutConfirm } = useBoolean(false);

  const handleConfirmOut = () => {
    toast.success('참여자를 그룹에서 내보냈습니다.');
    closeOutConfirm();
  };

  return (
    <div className={styles.Container}>
      <Header
        prefixSlot={
          <Link to={`/groups/${group.id}/info`}>
            <ArrowLeft color={Theme.color.neutral50} />
          </Link>
        }
      >
        참여자 목록
      </Header>
      <div>
        {memberList.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            suffix={
              isAdmin &&
              !member.isAdmin && (
                <Button size={'S'} color={'neutral'} variant={'outline'} onClick={openOutConfirm}>
                  내보내기
                </Button>
              )
            }
          />
        ))}
      </div>
      <ConfirmModal
        show={isOutConfirmOpen}
        title={'참여자를 그룹에서 내보낼까요?'}
        description={'공유한 후보자 정보는 함께 삭제돼요.\n참여자는 다시 초대할 수 있어요.'}
        confirmText={'확인'}
        cancelText={'취소'}
        onConfirm={handleConfirmOut}
        onCancel={closeOutConfirm}
      />
    </div>
  );
};
