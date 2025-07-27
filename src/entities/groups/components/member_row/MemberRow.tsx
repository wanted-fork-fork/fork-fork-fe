import { GroupMember } from 'src/entities/groups/mocks/groupInfoMock';
import Flex from 'src/shared/ui/Flex/Flex';
import { ReactNode } from 'react';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';

import styles from './MemberRow.module.css';

export const MemberRow = ({ member, suffix }: { member: GroupMember; suffix?: ReactNode }) => {
  return (
    <Flex className={styles.Container} gap={12}>
      <Avatar fallback={''} src={member.profileImage} size={40} shape={'circle'} />
      <div className={styles.Name}>
        <span>{member.name}</span>
        {member.isAdmin && <span className={styles.Badge}>그룹장</span>}
      </div>
      {suffix}
    </Flex>
  );
};
