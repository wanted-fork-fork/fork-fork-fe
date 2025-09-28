import styles from './Empty.module.css';
import { ReactNode } from 'react';

export const Empty = ({ text }: { text?: ReactNode }) => {
  return (
    <div className={styles.EmptyView}>
      <img src="/images/empty_2.png" alt="정보 목록이 비어있음" />
      <p>
        {text ?? (
          <>
            등록된 정보가 없습니다.
            <br />
            지인의 정보를 등록하여 인연을 이어주세요!
          </>
        )}
      </p>
    </div>
  );
};
