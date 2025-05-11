import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { Button } from 'src/shared/ui/Button/Button';
import { Link } from '@remix-run/react';
import styles from 'src/entities/users/profiles/components/EmailBanner/EmailBannerBottomSheet.module.css';
import { useMutation } from '@tanstack/react-query';
import { optOutEmail } from 'src/types';

export const EmailBannerBottomSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { mutateAsync } = useMutation({
    mutationFn: optOutEmail,
  });

  const handleClickOptOut = async () => {
    mutateAsync({});
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} detent={'content-height'}>
      <BottomSheet.Header className={styles.Header} onClose={onClose} />
      <BottomSheet.Content>
        <p className={styles.Subtitle}>구구 알림 서비스 OPEN!</p>
        <h2 className={styles.Title}>
          소개 후보 등록되면
          <br />
          바로 알려드려요
        </h2>
        <div className={styles.ButtonWrapper}>
          <img src="/images/googoo_mail.png" alt="메일 알림" />
          <Link to={'/account/email/edit'}>
            <Button widthType={'fill'}>이메일로 알림 받기</Button>
          </Link>
          <button className={styles.Dismiss} onClick={handleClickOptOut}>
            14일동안 보지 않기
          </button>
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
