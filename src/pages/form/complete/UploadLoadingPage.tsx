import { InfoBox } from 'src/shared/ui/InfoBox/InfoBox';
import styles from './UploadLoadingPage.module.css';
import { useEffect } from 'react';

export const UploadLoadingPage = ({ name, onComplete }: { name: string; onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 5_000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.TitleSection}>
        <h2>{name}님의 정보를 업로드하고 있습니다.</h2>
        <p>
          업로드 중에 나가면 정보가 사라져요!
          <br />
          잠시만 기다려주세요.
        </p>
      </div>
      <div className={styles.ImageSection}>
        <img src={'/images/googoo_2.gif'} alt={'타자를 치는 구구'} />
        <p>0%</p>
      </div>
      <InfoBox radiusSize="S">
        <h3>막간 소개팅 꿀팁</h3>
        <p>꿀팁 들어갈 장소</p>
      </InfoBox>
    </div>
  );
};
