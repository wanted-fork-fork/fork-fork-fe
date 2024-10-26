import styles from 'src/pages/form/complete/UploadLoadingPage.module.css';
import { InfoBox } from 'src/shared/ui/InfoBox/InfoBox';
import { TipContents } from 'src/pages/form/complete/_constants/tipContents';
import { useEffect, useState } from 'react';

export const UploadLoadingPageView = ({ name, progress }: { name: string; progress: number }) => {
  const [tipContentIdx, setTipContentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTipContentIdx((prev) => (prev + 1) % TipContents.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className={styles.TitleSection}>
        <h2>{name}님의 정보를 업로드하고 있습니다.</h2>
        <p>
          업로드 중에 나가면 정보가 사라져요!
          <br />
          잠시만 기다려주세요.
        </p>
      </div>
      <div className={styles.ImageSection}>
        <img src={'/images/loading.gif'} alt={'타자를 치는 구구'} />
        <p>{(progress * 100).toFixed(0)}%</p>
      </div>
      <InfoBox radiusSize="S">
        <h3 className={styles.InfoBoxTitle}>💡성공적인 만남을 위한 Tip💡</h3>
        <p className={styles.InfoBoxContents}>{TipContents[tipContentIdx]}</p>
      </InfoBox>
    </>
  );
};
