import { MainHeader } from 'src/widgets/main/header/MainHeader';
import { UserInfoResponse } from 'src/types';

import styles from './GroupListPage.module.css';
import { GroupSummary } from 'src/entities/groups/mocks/groupInfoMock';
import { GroupSummaryCard } from 'src/entities/groups/components/GroupSummaryCard';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Link } from '@remix-run/react';

export const GroupListPage = ({ userInfo, groupList }: { userInfo: UserInfoResponse; groupList: GroupSummary[] }) => {
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
    </div>
  );
};
