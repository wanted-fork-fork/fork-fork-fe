import { Header } from 'src/shared/ui/layout/Header/Header';
import { Input } from 'src/shared/ui/Input/Input';
import { Button } from 'src/shared/ui/Button/Button';
import { useNavigate } from '@remix-run/react';
import styles from './EmailConfigPage.module.css';

export const EmailConfigPage = () => {
  const navigate = useNavigate();

  const handleClickPrev = () => {
    navigate('/');
  };

  return (
    <div className={styles.Container}>
      <Header onPrev={handleClickPrev} suffixSlot={<></>}>
        메일 설정
      </Header>
      <div className={styles.Body}>
        <h2>
          새로 추가 되는 소개 후보,
          <br />
          놓치지 않도록 메일로 알려드릴게요.
        </h2>
        <div className={styles.EmailInput}>
          <Input className={styles.Input} type={'email'} placeholder={'email@example.co.kr'} width={'100%'} />
          {/* 높이 40px*/}
          <Button className={styles.Button} size={'S'}>
            코드 발송
          </Button>
        </div>
        <Input
          placeholder={'인증코드 6자리를 입력해주세요.'}
          suffixSlot={<span className={styles.Timer}>05:00</span>}
        />
      </div>
      <div className={styles.Footer}>
        <Button widthType="fill">완료</Button>
      </div>
    </div>
  );
};
