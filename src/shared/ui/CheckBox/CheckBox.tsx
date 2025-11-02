import styles from './CheckBox.module.css';
import { ChangeEvent, MouseEvent, useId } from 'react';
import { Check } from 'src/shared/ui/icons';

type CheckBoxProps = {
  className?: string;
  checked: boolean;
  label: string;
  onClick?: (e: MouseEvent) => void;
  onChange: (value: boolean, e: ChangeEvent) => void;
  /**
   * @default circle
   */
  shape?: 'circle' | 'line';
  disabled?: boolean;
};

export const CheckBox = ({
  className = '',
  shape = 'circle',
  checked,
  label,
  onChange,
  onClick,
  disabled,
}: CheckBoxProps) => {
  const id = useId();

  return (
    <div
      className={`${styles.Wrapper} ${className}`}
      data-background={shape === 'circle'}
      data-checked={checked}
      aria-disabled={disabled}
    >
      <input
        className={styles.CheckBox}
        type={'checkbox'}
        checked={checked}
        id={id}
        onChange={(e) => onChange(!checked, e)}
        onClick={onClick}
        disabled={disabled}
      />
      <label className={styles.Label} htmlFor={id}>
        <span className={styles.CheckMark}>
          <Check />
        </span>
        {label}
      </label>
    </div>
  );
};
