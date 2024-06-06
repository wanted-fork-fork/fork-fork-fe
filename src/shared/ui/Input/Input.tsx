import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  suffixSlot?: ReactNode;
};

export const Input = ({ suffixSlot, ...props }: InputProps) => {
  return (
    <div className={styles.Container}>
      <input className={styles.Input} {...props} />
      {suffixSlot && <span className={styles.SuffixSlotContainer}>{suffixSlot}</span>}
    </div>
  );
};
