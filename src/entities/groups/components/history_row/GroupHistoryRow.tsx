import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import dayjs from 'dayjs';
import { ArrowRight } from 'src/shared/ui/icons';
import Flex from 'src/shared/ui/Flex/Flex';
import styles from './GroupHistoryRow.module.css';
import { Theme } from 'src/shared/styles/constants';
import { Link } from '@remix-run/react';
import { GroupHistoryResponse, GroupHistoryResponseType } from 'src/types';

const HISTORY_TYPE_TO_TEXT: Record<GroupHistoryResponseType, string> = {
  INFO_ADDED: '후보자 공유',
  INFO_SHARED: '외부 정보 공유',
};

export const GroupHistoryRow = ({ history, groupId }: { history: GroupHistoryResponse; groupId: string }) => {
  return (
    <Flex className={styles.Container} gap={12} direction={'vertical'}>
      <div className={styles.HistoryInfo}>
        <Avatar fallback={''} shape={'circle'} size={40} src={history.userProfileImage} />
        <div className={styles.Contents}>
          <p>{HISTORY_TYPE_TO_TEXT[history.type]}</p>
          <div className={styles.Info}>
            <span>{history.userName}</span>
            <span>{dayjs(history.timestamp).format('YYYY. MM. DD HH:mm')}</span>
          </div>
        </div>
      </div>
      <Link className={styles.ProfileInfo} to={`/groups/${groupId}/profiles/${history.infoId}`}>
        <Avatar fallback={''} shape={'circle'} size={24} src={history.userProfileImage} />
        <span className={styles.Name}>{history.userName}</span>
        <ArrowRight width={16} color={Theme.color.neutral40} />
      </Link>
    </Flex>
  );
};
