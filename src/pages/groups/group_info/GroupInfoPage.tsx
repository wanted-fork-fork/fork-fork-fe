import { GroupSummary, iconMap } from 'src/entities/groups/mocks/groupInfoMock';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link } from '@remix-run/react';
import { ArrowLeft, ArrowRight } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import styles from './GroupInfoPage.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import Flex from 'src/shared/ui/Flex/Flex';
import { ReactNode } from 'react';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { GroupCreateModal } from 'src/entities/groups/components/create_modal/GroupCreateModal';
import toast from 'react-hot-toast';
import { GroupCreateCompleteModal } from 'src/entities/groups/components/create_complete_modal/GroupCreateCompleteModal';

export const GroupInfoPage = ({ groupInfo, isAdmin }: { groupInfo: GroupSummary; isAdmin?: boolean }) => {
  const { value: isDeleteConfirmOpen, setTrue: openDeleteConfirm, setFalse: closeDeleteConfirm } = useBoolean(false);
  const { value: isShareModalOpen, setTrue: openShareModal, setFalse: closeShareModal } = useBoolean(false);
  const {
    value: isWithdrawConfirmOpen,
    setTrue: openWithdrawConfirm,
    setFalse: closeWithdrawConfirm,
  } = useBoolean(false);
  const { value: isEditModalOpen, setTrue: openEditModal, setFalse: closeEditModal } = useBoolean(false);

  const handleSubmitEdit = () => {
    toast.success('변경사항이 저장되었습니다.');
    closeEditModal();
  };

  return (
    <div>
      <Header
        prefixSlot={
          <Link to={`/groups/${groupInfo.id}`}>
            <ArrowLeft color={Theme.color.neutral50} />
          </Link>
        }
      >
        그룹 정보
      </Header>
      <div className={styles.Container}>
        <div className={styles.InfoContainer}>
          <Avatar className={styles.Thumbnail} fallback={''} shape={'circle'} src={iconMap[groupInfo.icon]} size={50} />
          <p>{groupInfo.name}</p>
          <Button variant={'ghost'} size={'fit'} onClick={openEditModal}>
            수정
          </Button>
        </div>
        <hr className={styles.Divider} />
        <div className={styles.MenuContainer}>
          <h3>참여자 관리</h3>
          <Menu
            to={`/groups/${groupInfo.id}/members`}
            text={'참여자 목록'}
            suffix={<span className={styles.GraySuffix}>{groupInfo.candidateCounts}명</span>}
          />
          {isAdmin && (
            <Menu
              to={`/groups/${groupInfo.id}/members`}
              text={'수락 대기 중'}
              suffix={<span className={styles.PrimarySuffix}>{groupInfo.candidateCounts}명</span>}
            />
          )}
          <Button
            className={styles.Menu}
            variant={'ghost'}
            color={'neutral'}
            widthType={'fill'}
            textAlign={'left'}
            onClick={openShareModal}
            suffixSlot={
              <Flex align={'center'} gap={12}>
                <ArrowRight color={Theme.color.neutral40} />
              </Flex>
            }
          >
            멤버 추가
          </Button>
          {isAdmin && (
            <Button
              className={styles.TextButton}
              variant={'ghost'}
              size={'fit'}
              color={'neutral'}
              widthType={'hug'}
              onClick={openDeleteConfirm}
            >
              그룹 삭제
            </Button>
          )}
          {!isAdmin && (
            <Button
              className={styles.TextButton}
              variant={'ghost'}
              size={'fit'}
              color={'neutral'}
              widthType={'hug'}
              onClick={openWithdrawConfirm}
            >
              그룹에서 나가기
            </Button>
          )}
        </div>
      </div>
      <ConfirmModal
        show={isDeleteConfirmOpen}
        title={'그룹을 삭제하시겠어요?'}
        description={'공유한 후보자 정보는 함께 삭제돼요.\n참여자는 다시 초대할 수 있어요.'}
        confirmText={'확인'}
        cancelText={'취소'}
        onCancel={closeDeleteConfirm}
        onConfirm={closeDeleteConfirm}
      />
      <ConfirmModal
        show={isWithdrawConfirmOpen}
        title={'그룹을 탈퇴하시겠어요?'}
        confirmText={'확인'}
        cancelText={'취소'}
        onCancel={closeWithdrawConfirm}
        onConfirm={closeWithdrawConfirm}
      />
      <GroupCreateModal
        isOpen={isEditModalOpen}
        initialData={{ name: groupInfo.name, icon: groupInfo.icon }}
        onClose={closeEditModal}
        onSubmit={handleSubmitEdit}
        edit
      />
      <GroupCreateCompleteModal
        title="멤버 추가"
        description={
          <>
            같이 인연을 만들어가고 싶은 분께
            <br />
            참여 링크를 보내고 후보자 공유를 시작하세요.
          </>
        }
        groupId={groupInfo.id}
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
      />
    </div>
  );
};

const Menu = ({ text, suffix, to }: { text: string; suffix?: ReactNode; to: string }) => {
  return (
    <Link to={to}>
      <Button
        className={styles.Menu}
        variant={'ghost'}
        color={'neutral'}
        widthType={'fill'}
        textAlign={'left'}
        suffixSlot={
          <Flex align={'center'} gap={12}>
            {suffix}
            <ArrowRight color={Theme.color.neutral40} />
          </Flex>
        }
      >
        {text}
      </Button>
    </Link>
  );
};
