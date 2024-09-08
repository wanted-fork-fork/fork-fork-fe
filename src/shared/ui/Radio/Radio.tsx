import styles from './Radio.module.css';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { CheckedRadio, UncheckedRadio } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';

export type RadioProps = Exclude<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'> & {
  label: string;
};

export const Radio = ({ className, label, ...props }: RadioProps) => {
  return (
    <label className={`${styles.Label} ${className}`}>
      <input className={styles.Radio} type={'radio'} {...props} />
      {props.checked ? (
        <CheckedRadio color={Theme.color.neutral30} />
      ) : (
        <UncheckedRadio color={Theme.color.neutral30} />
      )}
      {label}
    </label>
  );
};
