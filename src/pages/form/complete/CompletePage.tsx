import styles from './CompletePage.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { Link } from '@remix-run/react';

export const CompletePage = ({ showMainButton }: { showMainButton?: boolean }) => {
  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.TitleSection}>
        정보를 입력해주셔서 감사합니다!
        <br />
        제가 꼭 좋은 소식 전해드릴게요!
      </h2>
      <div className={styles.ImageWrapper}>
        <img className={styles.Image} src={'/images/form_complete.png'} alt={'인사하는 구구'} />
      </div>
      {showMainButton && (
        <Link to={'/'}>
          <Button widthType={'fill'}>메인으로 돌아가기</Button>
        </Link>
      )}
    </div>
  );
};
