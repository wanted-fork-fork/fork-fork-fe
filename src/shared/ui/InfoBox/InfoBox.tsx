import { PropsWithChildren } from 'react';
import styles from './InfoBox.module.css';

type Props = PropsWithChildren<{
  radiusSize: 'S' | 'M' | 'L';
}>;

export const InfoBox = ({ radiusSize = 'M', children }: Props) => (
  <div className={`${styles.Container} ${styles[`Radius${radiusSize}`]}`}>{children}</div>
);
