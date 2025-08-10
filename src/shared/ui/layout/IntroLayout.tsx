import { ReactElement, ReactNode } from 'react';
import styles from './IntroLayout.module.css';

export const IntroLayout = ({
  title,
  description,
  imgUrl,
  imgAlt,
  imgClassName = '',
  footer,
}: {
  title: ReactNode;
  description: ReactNode;
  imgUrl: string;
  imgAlt: string;
  imgClassName?: string;
  footer: ReactElement;
}) => {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.TitleWrapper}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.Footer}>
        {footer}
        <img className={`${styles.Image} ${imgClassName}`} src={imgUrl} alt={imgAlt} />
      </div>
    </div>
  );
};
