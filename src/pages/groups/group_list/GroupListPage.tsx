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

export const GroupListPage = ({ userInfo, groupList }: { userInfo: UserInfoResponse; groupList: GroupSummary[] }) => {
  const { value: isOpen, setTrue: open, setFalse: close } = useBoolean(false);

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
      <FloatingButton onClick={open} />
      <GroupCreateModal isOpen={isOpen} onClose={close} onSubmit={console.log} />
    </div>
  );
};
