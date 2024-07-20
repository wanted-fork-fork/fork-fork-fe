import { Button } from 'src/shared/ui/Button/Button';
import styles from './IdealParterIntroPage.module.css';

type IdealPartnerIntroPageProps = {
  name: string;
};

export const IdealPartnerIntroPage = ({ name }: IdealPartnerIntroPageProps) => {
  return (
    <div className={styles.Wrapper}>
      <div />
      <div className={styles.TitleSection}>
        <h2>
          {name}님에 대해 잘 알게 되었어요.
          <br />
          선호하는 스타일도 알 수 있을까요?
        </h2>
        <p>
          이상형 정보는 <strong>주선자만 볼 수 있고</strong>
          <br />
          자세한 정보는 좋은 인연을 찾는 데 도움이 돼요.
        </p>
      </div>
      <img className={styles.Image} src={'/images/googoo_1.png'} alt={'종이를 든 구구'} />
      <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={() => {}}>
        시작하기
      </Button>
    </div>
  );
};
