import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { iconMap } from 'src/entities/groups/mocks/groupInfoMock';
import styles from 'src/entities/groups/components/card/GroupSummaryCard.module.css';
import Flex from 'src/shared/ui/Flex/Flex';
import { GroupListResponse } from 'src/types';

export const GroupSummaryCard = ({
  group: { groupName, groupIcon, candidateCount, myStatus },
}: {
  group: GroupListResponse;
}) => {
  return (
    <article className={styles.Container}>
      <Avatar className={styles.Thumbnail} fallback={''} shape={'circle'} size={50} src={iconMap[groupIcon]} />
      <Flex direction={'vertical'} gap={8} align={'start'}>
        <h3>{groupName}</h3>
        <p>공유된 후보자 {candidateCount}명</p>
      </Flex>
      {myStatus === 'PENDING' && <div className={styles.Overlay}>참여 대기 중</div>}
    </article>
  );
};
