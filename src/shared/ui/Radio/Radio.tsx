import styles from './Radio.module.css';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

type RadioProps = Exclude<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> & {
  label: string;
};

export const Radio = ({ label, ...props }: RadioProps) => {
  return (
    <label className={styles.Label}>
      <input className={styles.Radio} type={'radio'} {...props} />
      {label}
    </label>
  );
};
