import { iconMap } from 'src/entities/groups/mocks/groupInfoMock';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link, useNavigate, useRevalidator } from '@remix-run/react';
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
import { CreateGroupRequestIcon, deleteGroup, GroupInfoResponse, manageMember, updateGroup } from 'src/types';

export const GroupInfoPage = ({ groupInfo, userId }: { groupInfo: GroupInfoResponse; userId: string }) => {
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const { value: isDeleteConfirmOpen, setTrue: openDeleteConfirm, setFalse: closeDeleteConfirm } = useBoolean(false);
  const { value: isShareModalOpen, setTrue: openShareModal, setFalse: closeShareModal } = useBoolean(false);
  const {
    value: isWithdrawConfirmOpen,
    setTrue: openWithdrawConfirm,
    setFalse: closeWithdrawConfirm,
  } = useBoolean(false);
  const { value: isEditModalOpen, setTrue: openEditModal, setFalse: closeEditModal } = useBoolean(false);

  const isAdmin = groupInfo.myStatus === 'ADMIN';

  const handleSubmitEdit = async (name: string, icon: CreateGroupRequestIcon) => {
    await updateGroup(groupInfo.groupId, {
      name,
      icon,
    });

    toast.success('변경사항이 저장되었습니다.');
    revalidator.revalidate();
    closeEditModal();
  };

  const handleDeleteGroup = async () => {
    await deleteGroup(groupInfo.groupId);

    toast.success('그룹을 삭제했습니다.');
    navigate('/');
  };

  const handleWithdraw = async () => {
    await manageMember(groupInfo.groupId, userId, { action: 'LEAVE' });

    toast.success('그룹에서 나왔습니다.');
    navigate('/');
  };

  return (
    <div>
      <Header
        prefixSlot={
          <Link to={`/groups/${groupInfo.groupId}`}>
            <ArrowLeft color={Theme.color.neutral50} />
          </Link>
        }
      >
        그룹 정보
      </Header>
      <div className={styles.Container}>
        <div className={styles.InfoContainer}>
          <Avatar
            className={styles.Thumbnail}
            fallback={''}
            shape={'circle'}
            src={iconMap[groupInfo.groupIcon]}
            size={50}
          />
          <p>{groupInfo.groupName}</p>
          <Button variant={'ghost'} size={'fit'} onClick={openEditModal}>
            수정
          </Button>
        </div>
        <hr className={styles.Divider} />
        <div className={styles.MenuContainer}>
          <h3>참여자 관리</h3>
          <Menu
            to={`/groups/${groupInfo.groupId}/members`}
            text={'참여자 목록'}
            suffix={<span className={styles.GraySuffix}>{groupInfo.memberCount}명</span>}
          />
          {isAdmin && (
            <Menu
              to={`/groups/${groupInfo.groupId}/requests`}
              text={'참여 요청 목록'}
              suffix={
                groupInfo.pendingCount > 0 && <span className={styles.PrimarySuffix}>{groupInfo.pendingCount}명</span>
              }
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
        onConfirm={handleDeleteGroup}
      />
      <ConfirmModal
        show={isWithdrawConfirmOpen}
        title={'그룹을 탈퇴하시겠어요?'}
        confirmText={'확인'}
        cancelText={'취소'}
        onCancel={closeWithdrawConfirm}
        onConfirm={handleWithdraw}
      />
      <GroupCreateModal
        isOpen={isEditModalOpen}
        initialData={{ name: groupInfo.groupName, icon: groupInfo.groupIcon }}
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
        groupId={groupInfo.groupId}
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
