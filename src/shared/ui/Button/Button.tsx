import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styles from './Button.module.css';
import { cva } from 'cva';

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant: 'filled' | 'outline' | 'ghost';
  color: 'primary' | 'neutral';
  widthType: 'fill' | 'hug';
  suffixSlot?: ReactNode;
  prefixSlot?: ReactNode;
  textAlign?: 'left' | 'center' | 'right';
  size?: 'fit' | 'S' | 'M';
};

const buttonStyle = cva(styles.Button, {
  variants: {
    disabled: { enabled: '', disabled: '' },
    widthType: { fill: styles.WidthType_Fill, hug: styles.WidthType_Hug },
    textAlign: { left: styles.TextAlign_Left, center: styles.TextAlign_Center, right: styles.TextAlign_Right },
    size: { M: styles.Size_M, S: styles.Size_S, fit: styles.Size_Fit },
    variant: { filled: '', outline: '', ghost: '' },
    color: { primary: '', neutral: '' },
  },
  compoundVariants: [
    { variant: 'filled', color: 'primary', className: styles.Variant_Filled_Primary },
    { variant: 'filled', color: 'neutral', className: styles.Variant_Filled_Neutral },
    { variant: 'outline', color: 'primary', className: styles.Variant_Outline_Primary },
    { variant: 'outline', color: 'neutral', className: styles.Variant_Outline_Neutral },
    { variant: 'ghost', color: 'primary', className: styles.Variant_Ghost_Primary },
    { variant: 'ghost', color: 'neutral', className: styles.Variant_Ghost_Neutral },
    { variant: 'ghost', disabled: 'disabled', className: styles.Disabled_Ghost },
  ],
});

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
    className={`${buttonStyle({ variant, color, widthType, textAlign, size, disabled: props.disabled ? 'disabled' : 'enabled' })} ${className}`}
    {...props}
  >
    {prefixSlot && <span className={styles.PrefixSlot}>{prefixSlot}</span>}
    {children && <span className={styles.Center}>{children}</span>}
    {suffixSlot && <span className={styles.SuffixSlot}>{suffixSlot}</span>}
  </button>
);
