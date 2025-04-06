import { Header } from 'src/shared/ui/layout/Header/Header';
import { useNavigate } from '@remix-run/react';
import styles from 'src/pages/mypage/email/EmailConfigPage.module.css';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { VerifyEmail } from 'src/features/VerifyEmail/VerifyEmail';
import { useMutation } from '@tanstack/react-query';
import { sendEmailVerifyCode, updateEmail, verifyEmailVerifyCode } from 'src/types';
import { useCallback } from 'react';

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
  const navigate = useNavigate();

  const { mutate: mutateUpdateEmail } = useMutation({
    mutationFn: updateEmail,
    onSuccess: onConfirm,
  });

  const handleClickPrev = () => {
    navigate('/');
  };

  const handleConfirm = useCallback(
    (email: string) => {
      mutateUpdateEmail({ email });
    },
    [mutateUpdateEmail],
  );

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
        <VerifyEmail
          confirmButtonText={confirmButtonText}
          onConfirm={handleConfirm}
          onClickShowLater={onClickShowLater}
          sendEmailVerifyCode={sendEmailVerifyCode}
          verifyEmailCode={verifyEmailVerifyCode}
        />
      </div>
    </div>
  );
};
