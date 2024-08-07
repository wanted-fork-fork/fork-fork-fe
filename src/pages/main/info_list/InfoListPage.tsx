import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { ProfileCardList } from 'src/widgets/ProfileCardList/ProfileCardList';
import styles from './InfoListPage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { profileMock } from 'src/entities/profile/api/__mock__/profile.mock';
import { Link } from '@remix-run/react';

export const InfoListPage = () => {
  const profileList = Array.from({ length: 10 }).map(() => profileMock);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.Header}>
        <h2>소개 후보</h2>
        <Link to={'/mypage'}>
          <Avatar fallback={''} shape={'circle'} size={32} src={'/images/googoo_1.png'} />
        </Link>
      </div>
      <p className={styles.ListInfo}>총 {profileList.length}명</p>
      {profileList.length ? (
        <ScrollView viewportClassName={styles.Viewport}>
          <ProfileCardList profileList={profileList} />
        </ScrollView>
      ) : (
        <div className={styles.EmptyView}>
          <img src="/images/empty.png" alt="정보 목록이 비어있음" />
          <p>
            등록된 정보가 없습니다.
            <br />
            지인의 정보를 등록하여 인연을 이어주세요!
          </p>
        </div>
      )}
    </div>
  );
};
