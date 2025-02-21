import { forwardRef, useEffect, useState } from 'react';
import { Close, Timer } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import dayjs from 'dayjs';
import styles from './ExpiredDateTimer.module.css';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';

const refineNumber = (n: number) => Math.floor(n).toString().padStart(2, '0');
const getDiffText = (expiredDate: Date) => {
  const diff = dayjs(expiredDate).diff(dayjs(), 'second');
  return `${refineNumber(diff / (60 * 60))}:${refineNumber((diff % (60 * 60)) / 60)}:${refineNumber(diff % 60)}`;
};

export const ExpiredDateTimer = forwardRef<HTMLDivElement, { expiredDate: Date; type: 'BOX' | 'NUDGE' }>(
  function ExpiredDateTimerComponent({ expiredDate, type = 'BOX' }, ref) {
    const [timerText, setTimerText] = useState(() => getDiffText(expiredDate));

    useEffect(() => {
      const timer = setInterval(() => {
        setTimerText(getDiffText(expiredDate));
      }, 1000);
      return () => clearInterval(timer);
    }, []);

    const [showNudge, setShowNudge] = useState(true);

    if (type === 'BOX') {
      return (
        <div className={styles.Box} ref={ref}>
          <span className={styles.Description}>이 시간동안 정보를 확인할 수 있어요!</span>
          <div className={styles.Timer}>
            <Timer color={'transparent'} />
            <span className={styles.TimerText}>{timerText}</span>
          </div>
        </div>
      );
    }

    if (type === 'NUDGE') {
      return (
        showNudge && (
          <div className={styles.Nudge}>
            <div className={styles.Timer}>
              <span>정보 확인 가능 시간</span>
              <span className={styles.TimerText}>{timerText}</span>
            </div>
            <IconButton onClick={() => setShowNudge(false)}>
              <Close color={Theme.color.neutral10} />
            </IconButton>
          </div>
        )
      );
    }
  },
);
