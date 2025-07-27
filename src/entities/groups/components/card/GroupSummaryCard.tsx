import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { GroupSummary } from 'src/entities/groups/mocks/groupInfoMock';
import styles from 'src/entities/groups/components/card/GroupSummaryCard.module.css';
import Flex from 'src/shared/ui/Flex/Flex';

export const GroupSummaryCard = ({ group: { name, icon, candidateCounts } }: { group: GroupSummary }) => {
  return (
    <article className={styles.Container}>
      <Avatar className={styles.Thumbnail} fallback={''} shape={'circle'} size={50} src={icon.url} />
      <Flex direction={'vertical'} gap={8} align={'start'}>
        <h3>{name}</h3>
        <p>공유된 후보자 {candidateCounts}명</p>
      </Flex>
    </article>
  );
};
