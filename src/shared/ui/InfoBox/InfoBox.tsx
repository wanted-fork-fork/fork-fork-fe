import { PropsWithChildren } from 'react';
import styles from './InfoBox.module.css';

type Props = PropsWithChildren<{
  radiusSize: 'S' | 'M' | 'L';
  className?: string;
}>;

export const InfoBox = ({ className = '', radiusSize = 'M', children }: Props) => (
  <div className={`${styles.Container} ${styles[`Radius${radiusSize}`]} ${className}`}>{children}</div>
);
