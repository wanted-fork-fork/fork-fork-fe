import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant: 'filled' | 'outline' | 'ghost' | 'link';
  color: 'primary' | 'neutral';
  widthType: 'fill' | 'hug';
  suffixSlot?: ReactNode;
  prefixSlot?: ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  size?: 'S' | 'M';
};

export const Button = ({
  className = '',
  variant,
  color,
  size = 'M',
  widthType = 'fill',
  textAlign = 'center',
  suffixSlot,
  prefixSlot,
  children,
  ...props
}: ButtonProps) => (
  <button
    className={`${styles.Button} ${className}`}
    {...props}
    data-variant={variant}
    data-color={color}
    data-size={size}
    data-width-type={widthType}
    data-text-align={textAlign}
  >
    {prefixSlot && <span className={styles.PrefixSlot}>{prefixSlot}</span>}
    {children && <span className={styles.Center}>{children}</span>}
    {suffixSlot && <span className={styles.SuffixSlot}>{suffixSlot}</span>}
  </button>
);
