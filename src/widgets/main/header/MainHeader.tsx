import { Link } from '@remix-run/react';
import { UserAvatar } from 'src/entities/users/profiles/components/UserAvatar';
import styles from './MainHeader.module.css';
import { UserInfoResponse } from 'src/types';
import { Button } from 'src/shared/ui/Button/Button';
import { ArrowRight, CheckCircle } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { useBoolean } from 'src/shared/functions/useBoolean';

export type MainHeaderTab = 'MY_INFO_LIST' | 'GROUP_LIST';

const TabNameMap: Record<MainHeaderTab, string> = {
  GROUP_LIST: '후보 공유',
  MY_INFO_LIST: '내 소개 후보',
};

export const MainHeader = ({ selectedTab, userInfo }: { selectedTab: MainHeaderTab; userInfo: UserInfoResponse }) => {
  const { value: show, setTrue: open, setFalse: close } = useBoolean(false);

  return (
    <>
      <div className={styles.Header}>
        <Button onClick={open} color={'neutral'} variant="ghost" size={'fit'}>
          <h2>
            {TabNameMap[selectedTab]}
            <CheckCircle color={Theme.color.neutral0} />
          </h2>
        </Button>
        <Link to={'/mypage'}>
          <UserAvatar size={32} imageSrc={userInfo.profileImage} />
        </Link>
      </div>
      {show && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div className={styles.SelectModalContainer} onClick={close}>
          <div role={'tablist'} className={styles.SelectModal}>
            <SelectButton to={'/'} name={TabNameMap.MY_INFO_LIST} selected={selectedTab === 'MY_INFO_LIST'} />
            <SelectButton to={'/groups'} name={TabNameMap.GROUP_LIST} selected={selectedTab === 'GROUP_LIST'} />
          </div>
        </div>
      )}
    </>
  );
};

const SelectButton = ({ name, to, selected }: { name: string; to: string; selected: boolean }) => {
  return (
    <Link to={to}>
      <Button role={'tab'} textAlign={'left'} widthType={'fill'} aria-selected={selected}>
        <span>{name}</span>
        <ArrowRight width={20} color={selected ? undefined : Theme.color.neutral50} />
      </Button>
    </Link>
  );
};
