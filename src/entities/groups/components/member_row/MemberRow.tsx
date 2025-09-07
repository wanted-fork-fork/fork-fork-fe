import Flex from 'src/shared/ui/Flex/Flex';
import { ReactNode } from 'react';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';

import styles from './MemberRow.module.css';
import { GroupMemberResponse } from 'src/types';

export const MemberRow = ({
  member,
  suffix,
  bottom,
}: {
  member: GroupMemberResponse;
  suffix?: ReactNode;
  bottom?: ReactNode;
}) => {
  return (
    <Flex className={styles.Container} gap={12}>
      <Avatar fallback={''} src={member.userId} size={40} shape={'circle'} />
      <Flex direction={'vertical'} gap={8}>
        <Flex>
          <div className={styles.Name}>
            <span>{member.userName}</span>
            {member.status === 'ADMIN' && <span className={styles.Badge}>그룹장</span>}
          </div>
          {suffix}
        </Flex>
        {bottom}
      </Flex>
    </Flex>
  );
};
