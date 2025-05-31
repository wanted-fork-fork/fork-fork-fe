import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cva, VariantProps } from 'cva';
import styles from './Flex.module.css';

type FlexProps = HTMLAttributes<HTMLElement> & {
  gap?: number;
  children: ReactNode;
} & VariantProps<typeof flexStyle>;

const flexStyle = cva(styles.Flex, {
  variants: {
    justify: {
      start: styles.Justify_Start,
      end: styles.Justify_End,
      center: styles.Justify_Center,
      between: styles.Justify_Between,
    },
    align: { start: styles.Align_Start, center: styles.Align_Center },
    direction: { vertical: styles.Direction_Vertical, horizontal: styles.Direction_Horizontal },
  },
  defaultVariants: {
    justify: 'center',
    align: 'center',
    direction: 'horizontal',
  },
});

const Flex = forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const { className, direction, justify, align, gap, children, style, ...otherProps } = props;
  return (
    <div
      ref={ref}
      className={`${flexStyle({ direction, justify, align })} ${className}`}
      style={{ ['--flex-gap']: `${gap}px`, ...style }}
      {...otherProps}
    >
      {children}
    </div>
  );
});

Flex.displayName = 'Flex';

export default Flex;
