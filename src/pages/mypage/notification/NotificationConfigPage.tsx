import { Link, useNavigate } from '@remix-run/react';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Toggle } from 'src/shared/ui/Toggle/Toggle';
import { useState } from 'react';
import styles from './NotificationConfigPage.module.css';

export const NotificationConfigPage = ({ allowEmailNotification }: { allowEmailNotification: boolean }) => {
  const [emailNoti, setEmailNoti] = useState(allowEmailNotification);
  const navigate = useNavigate();
  const handleToggle = (value: boolean) => {
    if (value) {
      navigate('/account/email/edit');
      return;
    }

    // TODO: toggle off 시 동작
    setEmailNoti(false);
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
        <div className={styles.Row}>
          <span className={styles.Label}>알림 받기</span>
          <Toggle checked={emailNoti} onToggle={handleToggle} />
        </div>
      </div>
    </>
  );
};
