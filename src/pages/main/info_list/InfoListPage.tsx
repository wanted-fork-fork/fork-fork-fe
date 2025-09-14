import styles from './InfoListPage.module.css';
import { ArchivedInfoResponse, UserInfoResponse } from 'src/types';
import { Button } from 'src/shared/ui/Button/Button';
import { Share } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { MouseEvent } from 'react';
import { z } from 'zod';
import { filterSchema } from 'src/entities/candidates/_common/libs/filter';
import { MainHeader } from 'src/widgets/main/header/MainHeader';
import { InfoList } from 'src/widgets/info/InfoList';

export const InfoListPage = ({
  userInfo,
  profileList,
  totalCount,
  hasFilter,
  filter,
  loading = false,
  onIntersectBottom,
}: {
  userInfo: UserInfoResponse;
  profileList: ArchivedInfoResponse[];
  totalCount: number;
  hasFilter: boolean;
  filter: z.infer<typeof filterSchema>;
  loading?: boolean;
  onIntersectBottom?: () => void;
}) => {
  return (
    <div className={styles.Wrapper}>
      <MainHeader selectedTab={'MY_INFO_LIST'} userInfo={userInfo} />
      <InfoList
        profileList={profileList}
        totalCount={totalCount}
        filter={filter}
        hasFilter={hasFilter}
        loading={loading}
        getProfileLink={(id) => `/profile/${id}`}
        onIntersectBottom={onIntersectBottom}
      />
    </div>
  );
};

export const ProfileShareTrigger = ({ onClick }: { onClick: () => void }) => {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onClick();
  };

  return (
    <>
      <Button
        className={'profile-share-button'}
        variant={'ghost'}
        widthType={'hug'}
        color={'neutral'}
        size={'fit'}
        onClick={handleClick}
      >
        <Share color={Theme.color.neutral50} width={20} height={21} />
      </Button>
    </>
  );
};
