import { GroupSummary } from 'src/entities/groups/mocks/groupInfoMock';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link } from '@remix-run/react';
import { ArrowLeft, ArrowRight } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import styles from './GroupInfoPage.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import Flex from 'src/shared/ui/Flex/Flex';
import { ReactNode } from 'react';

export const GroupInfoPage = ({ groupInfo, isAdmin }: { groupInfo: GroupSummary; isAdmin?: boolean }) => {
  return (
    <div>
      <Header
        prefixSlot={
          <Link to={`/groups/${groupInfo.id}`}>
            <ArrowLeft color={Theme.color.neutral50} />
          </Link>
        }
      >
        그룹 정보
      </Header>
      <div className={styles.Container}>
        <div className={styles.InfoContainer}>
          <Avatar className={styles.Thumbnail} fallback={''} shape={'circle'} src={groupInfo.icon.url} size={50} />
          <p>{groupInfo.name}</p>
          <Button variant={'ghost'} size={'fit'}>
            수정
          </Button>
        </div>
        <hr className={styles.Divider} />
        <div className={styles.MenuContainer}>
          <h3>참여자 관리</h3>
          <Menu
            to={`/groups/${groupInfo.id}/members`}
            text={'참여자 목록'}
            suffix={<span className={styles.GraySuffix}>{groupInfo.candidateCounts}명</span>}
          />
          {isAdmin && (
            <Menu
              to={`/groups/${groupInfo.id}/members`}
              text={'수락 대기 중'}
              suffix={<span className={styles.PrimarySuffix}>{groupInfo.candidateCounts}명</span>}
            />
          )}
          <Menu to={`/groups/${groupInfo.id}/invite`} text={'멤버 추가'} />
          <Button className={styles.TextButton} variant={'ghost'} size={'fit'} color={'neutral'} widthType={'hug'}>
            그룹 삭제
          </Button>
        </div>
      </div>
    </div>
  );
};

const Menu = ({ text, suffix, to }: { text: string; suffix?: ReactNode; to: string }) => {
  return (
    <Link to={to}>
      <Button
        className={styles.Menu}
        variant={'ghost'}
        color={'neutral'}
        widthType={'fill'}
        textAlign={'left'}
        suffixSlot={
          <Flex align={'center'} gap={12}>
            {suffix}
            <ArrowRight color={Theme.color.neutral40} />
          </Flex>
        }
      >
        {text}
      </Button>
    </Link>
  );
};
