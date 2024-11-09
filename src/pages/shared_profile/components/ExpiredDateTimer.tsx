import { useEffect, useState } from 'react';
import { Timer } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import dayjs from 'dayjs';
import styles from './ExpiredDateTimer.module.css';

const getDiffText = (expiredDate: Date) => {
  const diff = dayjs(expiredDate).diff(dayjs(), 'second');
  return `${Math.floor(diff / (60 * 60))}:${Math.floor((diff % (60 * 60)) / 60)}:${Math.floor(diff % 60)}`;
};

export const ExpiredDateTimer = ({ expiredDate }: { expiredDate: Date }) => {
  const [timerText, setTimerText] = useState(() => getDiffText(expiredDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimerText(getDiffText(expiredDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.Box}>
      <span className={styles.Description}>이 시간동안 정보를 확인할 수 있어요!</span>
      <div className={styles.Timer}>
        <Timer color={Theme.color.primary} />
        <span className={styles.TimerText}>{timerText}</span>
      </div>
    </div>
  );
};
