import { MainHeader } from 'src/widgets/main/header/MainHeader';
import { UserInfoResponse } from 'src/types';

import styles from './GroupListPage.module.css';
import { GroupSummary } from 'src/entities/groups/mocks/groupInfoMock';
import { GroupSummaryCard } from 'src/entities/groups/components/card/GroupSummaryCard';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Link } from '@remix-run/react';
import { FloatingButton } from 'src/shared/ui/FloatingButton/FloatingButton';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { GroupCreateModal } from 'src/entities/groups/components/create_modal/GroupCreateModal';
import { GroupCreateCompleteModal } from 'src/entities/groups/components/create_complete_modal/GroupCreateCompleteModal';

export const GroupListPage = ({ userInfo, groupList }: { userInfo: UserInfoResponse; groupList: GroupSummary[] }) => {
  const { value: isOpenCreateModal, setTrue: openCreateModal, setFalse: closeCreateModal } = useBoolean(false);
  const { value: isOpenCompleteModal, setTrue: openCompleteModal, setFalse: closeCompleteModal } = useBoolean(false);

  const handleSubmitCreate = () => {
    closeCreateModal();
    openCompleteModal();
  };

  return (
    <div className={styles.Wrapper}>
      <MainHeader selectedTab={'GROUP_LIST'} userInfo={userInfo} />
      <ScrollView viewportClassName={styles.Viewport}>
        <div className={styles.List}>
          {groupList.map((item) => (
            <Link key={item.id} to={`/groups/${item.id}`}>
              <GroupSummaryCard group={item} />
            </Link>
          ))}
        </div>
      </ScrollView>
      <FloatingButton onClick={openCreateModal} />
      <GroupCreateModal isOpen={isOpenCreateModal} onClose={closeCreateModal} onSubmit={handleSubmitCreate} />
      <GroupCreateCompleteModal isOpen={isOpenCompleteModal} onClose={closeCompleteModal} />
    </div>
  );
};
