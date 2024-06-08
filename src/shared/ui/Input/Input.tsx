import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  suffixSlot?: ReactNode;
};

export const Input = forwardRef<HTMLInputElement | null, InputProps>(function InputComponent({ className, suffixSlot, ...props }: InputProps, ref) {
  return (
    <div className={`${className} ${styles.Container}`}>
      <input ref={ref} className={styles.Input} {...props} />
      {suffixSlot && <span className={styles.SuffixSlotContainer}>{suffixSlot}</span>}
    </div>
  );
});
