import styles from './VerifyEmail.module.css';
import { Input } from 'src/shared/ui/Input/Input';
import { Button } from 'src/shared/ui/Button/Button';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sendEmailVerifyCode, verifyEmailVerifyCode } from 'src/types';
import toast from 'react-hot-toast';

const timeLimit = 5 * 60;

const refineNumber = (n: number) => Math.floor(n).toString().padStart(2, '0');
const getTimerText = (sec: number) => {
  return `${refineNumber((sec % (60 * 60)) / 60)}:${refineNumber(sec % 60)}`;
};

const emailRegex = /^\S+@\S+\.\S+$/;

export const VerifyEmail = ({
  confirmButtonText = '완료',
  onConfirm,
  onClickShowLater,
}: {
  confirmButtonText?: string;
  onConfirm: (email: string) => void;
  onClickShowLater?: () => void;
}) => {
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

  const [code, setCode] = useState('');

  const [leftTime, setLeftTime] = useState(timeLimit);
  const [isSent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const isValidEmail = useMemo(() => emailRegex.test(email), [email]);
  const isConfirmDisabled = code.length < 6 || isPending;

  const handleClickSend = () => {
    mutateSendCode({ email });

    setSent(true);

    timerRef.current && clearInterval(timerRef.current);
    setLeftTime(timeLimit);
    timerRef.current = setInterval(() => {
      setLeftTime((prev) => prev - 1);
    }, 1000);
  };

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0 && (Number.isNaN(Number(value)) || value.length > 6)) {
      return;
    }
    setCode(value);
  };

  const handleVerifyCode = () => {
    mutateVerifyCode({ verifyCode: code });
  };

  useEffect(() => {
    return () => {
      timerRef.current && clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (verifyResult?.data) {
      onConfirm(email);
    }
    if (verifyResult?.data === false || verifyError) {
      toast.error('인증번호를 다시 확인해주세요.');
    }
  }, [email, onConfirm, verifyError, verifyResult?.data]);

  return (
    <div className={styles.Container}>
      <div className={styles.Body}>
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
