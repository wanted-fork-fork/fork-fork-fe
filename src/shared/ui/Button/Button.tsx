import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styles from './Button.module.css';
import { cva, VariantProps } from 'cva';

const buttonStyle = cva(styles.Button, {
  variants: {
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
  ],
  defaultVariants: {
    variant: 'filled',
    color: 'primary',
    size: 'M',
    textAlign: 'center',
  },
});

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  suffixSlot?: ReactNode;
  prefixSlot?: ReactNode;
} & VariantProps<typeof buttonStyle>;

export const Button = ({
  className = '',
  variant,
  color,
  size,
  widthType,
  textAlign,
  suffixSlot,
  prefixSlot,
  children,
  ...props
}: ButtonProps) => (
  <button className={`${buttonStyle({ variant, color, widthType, textAlign, size })} ${className}`} {...props}>
    {prefixSlot && <span className={styles.PrefixSlot}>{prefixSlot}</span>}
    {children && <span className={styles.Center}>{children}</span>}
    {suffixSlot && <span className={styles.SuffixSlot}>{suffixSlot}</span>}
  </button>
);
