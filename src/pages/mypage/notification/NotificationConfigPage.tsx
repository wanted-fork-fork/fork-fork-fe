import { Link, useNavigate } from '@remix-run/react';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Toggle } from 'src/shared/ui/Toggle/Toggle';
import { useState } from 'react';
import styles from './NotificationConfigPage.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { updateReceiveEmail } from 'src/types';
import { useMutation } from '@tanstack/react-query';

export const NotificationConfigPage = ({
  email,
  allowEmailNotification,
}: {
  email?: string;
  allowEmailNotification: boolean;
}) => {
  const [emailNoti, setEmailNoti] = useState(allowEmailNotification);
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: updateReceiveEmail,
    onSuccess: () => {
      setEmailNoti((prev) => !prev);
    },
  });

  const handleToggle = (value: boolean) => {
    if (!email) {
      navigate('/account/email/edit');
      return;
    }

    mutate({ receiveEmail: value });
  };

  return (
    <>
      <Header
        prefixSlot={
          <Link to={'/mypage'}>
            <ArrowLeft />
          </Link>
        }
      >
        후보자 추가 알림 받기
      </Header>
      <div className={styles.Body}>
        <div className={`${styles.NotiConfigRow} ${styles.Row}`}>
          <span className={styles.Label}>알림 받기</span>
          <Toggle checked={emailNoti} onToggle={handleToggle} />
        </div>
        {email && (
          <div className={styles.EmailConfigRow}>
            <div className={styles.Row}>
              <span className={styles.Label}>메일 설정</span>
              <Link to={'/account/email/edit'}>
                <Button widthType={'hug'} size={'fit'} variant={'ghost'}>
                  변경
                </Button>
              </Link>
            </div>
            <p>{email}</p>
          </div>
        )}
      </div>
    </>
  );
};
