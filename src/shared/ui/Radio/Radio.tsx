import styles from './Radio.module.css';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { CheckedRadio, UncheckedRadio } from 'src/shared/ui/icons';

export type RadioProps = Exclude<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> & {
  label: string;
};

export const Radio = ({ className, label, ...props }: RadioProps) => {
  return (
    <label className={`${styles.Label} ${className}`}>
      <input className={styles.Radio} type={'radio'} {...props} />
      {props.checked ? <CheckedRadio color={'#CDCACE'} /> : <UncheckedRadio color={'#CDCACE'} />}
      {label}
    </label>
  );
};
