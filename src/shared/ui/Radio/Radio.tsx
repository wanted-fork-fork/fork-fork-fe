import styles from './Radio.module.css';
import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import { CheckedRadio, UncheckedRadio } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';

export type RadioProps = Exclude<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> & {
  label: string;
  suffix?: ReactNode;
};

export const Radio = ({ className, label, suffix, ...props }: RadioProps) => {
  return (
    <label className={`${styles.Label} ${className}`}>
      <input className={styles.Radio} type={'radio'} {...props} />
      {props.checked ? (
        <CheckedRadio color={Theme.color.neutral30} />
      ) : (
        <UncheckedRadio color={Theme.color.neutral30} />
      )}
      <span>{label}</span>
      {suffix}
    </label>
  );
};
