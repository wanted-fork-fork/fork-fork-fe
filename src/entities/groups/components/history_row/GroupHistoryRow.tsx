import { GroupMember } from 'src/entities/groups/mocks/groupInfoMock';
import { ProfileSummary } from 'src/entities/candidates/info/types/profileSummary';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import dayjs from 'dayjs';
import { ArrowRight } from 'src/shared/ui/icons';
import Flex from 'src/shared/ui/Flex/Flex';
import styles from './GroupHistoryRow.module.css';
import { Theme } from 'src/shared/styles/constants';
import { Link } from '@remix-run/react';

export const GroupHistoryRow = ({
  member,
  contents,
  info,
  date,
  groupId,
}: {
  member: GroupMember;
  contents: string;
  info: ProfileSummary;
  date: Date;
  groupId: number;
}) => {
  return (
    <Flex className={styles.Container} gap={12} direction={'vertical'}>
      <div className={styles.HistoryInfo}>
        <Avatar fallback={''} shape={'circle'} size={40} src={member.profileImage} />
        <div className={styles.Contents}>
          <p>{contents}</p>
          <div className={styles.Info}>
            <span>{member.name}</span>
            <span>{dayjs(date).format('YYYY. MM. DD HH:mm')}</span>
          </div>
        </div>
      </div>
      <Link className={styles.ProfileInfo} to={`/group/${groupId}/profile/${info.id}`}>
        <Avatar fallback={''} shape={'circle'} size={24} src={info.images[0].url} />
        <span className={styles.Name}>{info.name}</span>
        <ArrowRight width={16} color={Theme.color.neutral40} />
      </Link>
    </Flex>
  );
};
