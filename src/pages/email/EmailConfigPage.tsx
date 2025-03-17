import { Header } from 'src/shared/ui/layout/Header/Header';
import { Input } from 'src/shared/ui/Input/Input';
import { Button } from 'src/shared/ui/Button/Button';
import { useLocation, useNavigate } from '@remix-run/react';
import styles from './EmailConfigPage.module.css';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendEmailVerifyCode, verifyEmailVerifyCode } from 'src/types';
import toast from 'react-hot-toast';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';

const timeLimit = 5 * 60;

const refineNumber = (n: number) => Math.floor(n).toString().padStart(2, '0');
const getTimerText = (sec: number) => {
  return `${refineNumber((sec % (60 * 60)) / 60)}:${refineNumber(sec % 60)}`;
};

const emailRegex = /^\S+@\S+\.\S+$/;

export const EmailConfigPage = ({
  showHeader = true,
  confirmButtonText = '완료',
  onConfirm,
  onClickShowLater,
}: {
  showHeader?: boolean;
  confirmButtonText?: string;
  onConfirm?: () => void;
  onClickShowLater?: () => void;
}) => {
  const location = useLocation();

  const {
    mutate: mutateSendCode,
    data,
    error,
    isPending: isPendingSend,
  } = useMutation({ mutationFn: sendEmailVerifyCode });
  const {
    mutate: mutateVerifyCode,
    data: verifyResult,
    error: verifyError,
    isPending,
  } = useMutation({ mutationFn: verifyEmailVerifyCode });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [leftTime, setLeftTime] = useState(timeLimit);
  const [isSent, setSent] = useState(false);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const navigate = useNavigate();

  const isValidEmail = useMemo(() => emailRegex.test(email), [email]);
  const isConfirmDisabled = code.length < 6 || isPending;

  useEffect(() => {
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (verifyResult?.data) {
      if (onConfirm) {
        onConfirm();
        return;
      }

      const redirectTo = new URLSearchParams(location.search).get('redirect');
      navigate(redirectTo ?? '/');
      toast.success('메일이 설정되었습니다.', { icon: null });
    }
    if (verifyResult?.data === false || verifyError) {
      toast.error('인증번호를 다시 확인해주세요.');
    }
  }, [verifyError, verifyResult?.data]);

  const handleClickPrev = () => {
    navigate('/');
  };

  const handleClickSend = () => {
    mutateSendCode({ email });

    setSent(true);

    timerRef.current && clearInterval(timerRef.current);
    setLeftTime(timeLimit);
    timerRef.current = setInterval(() => {
      setLeftTime((prev) => prev - 1);
    }, 1000);
  };

  const handleVerifyCode = () => {
    mutateVerifyCode({ verifyCode: code });
  };

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0 && (Number.isNaN(Number(value)) || value.length > 6)) {
      return;
    }
    setCode(value);
  };

  return (
    <div className={styles.Container}>
      {showHeader ? (
        <Header onPrev={handleClickPrev} suffixSlot={<></>}>
          메일 설정
        </Header>
      ) : (
        <Spacing size={60} />
      )}
      <div className={styles.Body}>
        <h2>
          새로 추가 되는 소개 후보,
          <br />
          놓치지 않도록 메일로 알려드릴게요.
        </h2>
        <div className={styles.EmailInput}>
          <Input
            className={styles.Input}
            type={'email'}
            placeholder={'email@example.co.kr'}
            width={'100%'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className={styles.Button}
            size={'S'}
            disabled={!isValidEmail || isPendingSend}
            onClick={handleClickSend}
          >
            코드 {data?.data && '재'}발송
          </Button>
        </div>
        {(error || data?.data === false) && <p className={styles.Error}>이메일 전송에 실패했습니다.</p>}
        {isSent && (
          <Input
            inputMode={'numeric'}
            placeholder={'인증코드 6자리를 입력해주세요.'}
            suffixSlot={<span className={styles.Timer}>{getTimerText(leftTime)}</span>}
            value={code}
            maxLength={6}
            onChange={handleChangeCode}
          />
        )}
      </div>
      <div className={styles.Footer}>
        <Button widthType="fill" disabled={isConfirmDisabled} onClick={handleVerifyCode}>
          {confirmButtonText}
        </Button>
        {onClickShowLater && (
          <Button widthType={'fill'} size={'fit'} variant={'ghost'} onClick={onClickShowLater}>
            <span className={styles.ShowLaterButton}>괜찮아요. 다음에 입력할게요.</span>
          </Button>
        )}
      </div>
    </div>
  );
};
