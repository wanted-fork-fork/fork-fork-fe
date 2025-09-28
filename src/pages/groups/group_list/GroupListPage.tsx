import { MainHeader } from 'src/widgets/main/header/MainHeader';
import { createGroup, CreateGroupRequestIcon, GroupInfoResponse, UserInfoResponse } from 'src/types';

import styles from './GroupListPage.module.css';
import { GroupSummaryCard } from 'src/entities/groups/components/card/GroupSummaryCard';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Link, useRevalidator } from '@remix-run/react';
import { FloatingButton } from 'src/shared/ui/FloatingButton/FloatingButton';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { GroupCreateModal } from 'src/entities/groups/components/create_modal/GroupCreateModal';
import { GroupCreateCompleteModal } from 'src/entities/groups/components/create_complete_modal/GroupCreateCompleteModal';
import Flex from 'src/shared/ui/Flex/Flex';
import { useMutation } from '@tanstack/react-query';

export const GroupListPage = ({
  userInfo,
  groupList,
}: {
  userInfo: UserInfoResponse;
  groupList: GroupInfoResponse[];
}) => {
  const revalidator = useRevalidator();

  const { value: isOpenCreateModal, setTrue: openCreateModal, setFalse: closeCreateModal } = useBoolean(false);
  const { value: isOpenCompleteModal, setTrue: openCompleteModal, setFalse: closeCompleteModal } = useBoolean(false);

  const {
    mutate: mutateCreateGroup,
    isPending,
    data,
  } = useMutation({
    mutationFn: createGroup,
    onSuccess: () => {
      closeCreateModal();
      openCompleteModal();
      revalidator.revalidate();
    },
  });

  const handleSubmitCreate = (name: string, icon: CreateGroupRequestIcon) => {
    mutateCreateGroup({ name, icon });
  };

  return (
    <div className={styles.Wrapper}>
      <MainHeader selectedTab={'GROUP_LIST'} userInfo={userInfo} />
      <ScrollView viewportClassName={styles.Viewport}>
        <div className={styles.List}>
          {Boolean(groupList.length === 0) && (
            <Flex className={styles.Empty} direction={'vertical'} align={'center'} gap={24}>
              <img src={'/images/group_empty.png'} alt={'아직 그룹이 없어요'} width={'173'} height={'134'} />
              <p>아직 참여한 그룹이 없어요.</p>
            </Flex>
          )}
          {groupList.map((item) =>
            item.myStatus === 'PENDING' ? (
              <GroupSummaryCard group={item} key={item.groupId} />
            ) : (
              <Link key={item.groupId} to={`/groups/${item.groupId}`}>
                <GroupSummaryCard group={item} />
              </Link>
            ),
          )}
        </div>
      </ScrollView>
      <FloatingButton onClick={openCreateModal} />
      <GroupCreateModal
        isOpen={isOpenCreateModal}
        onClose={closeCreateModal}
        onSubmit={handleSubmitCreate}
        isPending={isPending}
      />
      <GroupCreateCompleteModal
        groupId={data?.data.groupId}
        isOpen={isOpenCompleteModal}
        onClose={closeCompleteModal}
      />
    </div>
  );
};
