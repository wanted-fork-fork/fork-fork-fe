import { Button } from 'src/shared/ui/Button/Button';
import styles from './IdealParterIntroPage.module.css';
import Flex from 'src/shared/ui/Flex/Flex';

type IdealPartnerIntroPageProps = {
  name: string;
  onClickNextStep: () => void;
  onClickSkip: () => void;
};

export const IdealPartnerIntroPage = ({ name, onClickNextStep, onClickSkip }: IdealPartnerIntroPageProps) => {
  return (
    <div className={styles.Wrapper}>
      <div />
      <div className={styles.TitleSection}>
        <h2>
          {name}님에 대해 잘 알게 되었어요.
          <br />
          선호하는 스타일도 알려주세요!
        </h2>
        <p>
          이상형 정보는 <strong>주선자만 볼 수 있고</strong>
          <br />
          자세한 정보는 좋은 인연을 찾는 데 도움이 돼요.
        </p>
      </div>
      <img className={styles.Image} src={'/images/googoo_1.png'} alt={'종이를 든 구구'} />
      <Flex direction={'vertical'} gap={12}>
        <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={onClickNextStep}>
          이상형 입력하기
        </Button>
        <Button variant={'ghost'} widthType={'fill'} color={'primary'} onClick={onClickSkip}>
          건너뛰기
        </Button>
      </Flex>
    </div>
  );
};
