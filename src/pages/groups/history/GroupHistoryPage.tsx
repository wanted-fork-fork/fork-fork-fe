import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link } from '@remix-run/react';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { GroupHistoryRow } from 'src/entities/groups/components/history_row/GroupHistoryRow';
import { GroupHistory } from 'src/entities/groups/mocks/groupInfoMock';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import Flex from 'src/shared/ui/Flex/Flex';
import styles from './GroupHistoryPage.module.css';
import { Empty } from 'src/shared/ui/Empty/Empty';

export const GroupHistoryPage = ({ groupId, historyList }: { groupId: string; historyList: GroupHistory[] }) => {
  return (
    <div className={styles.Container}>
      <Header
        prefixSlot={
          <Link to={`/groups/${groupId}`}>
            <ArrowLeft color={Theme.color.neutral50} />
          </Link>
        }
      >
        히스토리
      </Header>
      <ScrollView>
        <Flex gap={8} direction={'vertical'}>
          {historyList.map((history) => (
            <GroupHistoryRow key={history.id} groupId={groupId} history={history} />
          ))}
          {historyList.length === 0 && <Empty text={'표시할 히스토리가 없습니다.'} />}
        </Flex>
      </ScrollView>
    </div>
  );
};
