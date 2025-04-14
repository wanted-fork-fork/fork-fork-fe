import styles from './VerifyEmail.module.css';
import { Input } from 'src/shared/ui/Input/Input';
import { Button } from 'src/shared/ui/Button/Button';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
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
  onDuplicated,
  onClickShowLater,
  sendEmailVerifyCode,
  verifyEmailCode,
}: {
  confirmButtonText?: string;
  onConfirm: (email: string, token?: string) => void;
  onDuplicated?: (email: string, token?: string) => void;
  onClickShowLater?: () => void;
  sendEmailVerifyCode: (request: { email: string }) => Promise<{ data: boolean }>;
  verifyEmailCode: (request: {
    verifyCode: string;
  }) => Promise<{ data: boolean; isDuplicated?: boolean; token?: string }>;
}) => {
  const {
    mutate: mutateSendCode,
    data,
    error,
    isPending: isPendingSend,
  } = useMutation({ mutationFn: sendEmailVerifyCode });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate: mutateVerifyCode, isPending } = useMutation({
    mutationFn: verifyEmailCode,
    onSuccess: (data) => {
      if (onDuplicated && data.isDuplicated) {
        onDuplicated(email, data.token);
        return;
      }

      if (data.data) {
        onConfirm(email, data.token);
      }

      if (data.data === false) {
        setErrorMessage('인증번호가 일치하지 않습니다. 다시 확인해주세요.');
      }
    },
    onError: () => {
      toast.error('오류가 발생했습니다. 잠시 뒤 다시 시도해주세요.');
    },
  });

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
      setLeftTime((prev) => {
        if (timerRef.current && prev === 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 0 && (Number.isNaN(Number(value)) || value.length > 6)) {
      return;
    }
    setErrorMessage(null);
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
          <div className={styles.InputWrapper}>
            <Input
              inputMode={'numeric'}
              placeholder={'인증코드 6자리를 입력해주세요.'}
              suffixSlot={<span className={styles.Timer}>{getTimerText(leftTime)}</span>}
              value={code}
              maxLength={6}
              onChange={handleChangeCode}
            />
            {errorMessage && <p className={styles.Error}>{errorMessage}</p>}
          </div>
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
