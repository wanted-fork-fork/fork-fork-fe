import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.css';
import { cva, VariantProps } from 'cva';

type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  suffixSlot?: ReactNode;
} & VariantProps<typeof inputStyle>;

const inputStyle = cva(styles.Container, {
  variants: {
    shape: { underline: styles.Shape_Underline, box: styles.Shape_Box },
  },
  defaultVariants: {
    shape: 'underline',
  },
});

export const Input = forwardRef<HTMLInputElement | null, InputProps>(function InputComponent(
  { className, suffixSlot, shape, ...props }: InputProps,
  ref,
) {
  return (
    <div className={`${className} ${inputStyle({ shape })}`}>
      <input ref={ref} className={styles.Input} {...props} />
      {suffixSlot && <span className={styles.SuffixSlotContainer}>{suffixSlot}</span>}
    </div>
  );
});
