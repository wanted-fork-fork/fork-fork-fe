import styles from './CheckBox.module.css';
import { useId } from 'react';
import { Check } from 'src/shared/ui/icons';

type CheckBoxProps = {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
  /**
   * @default circle
   */
  shape?: 'circle' | 'line';
};

export const CheckBox = ({ shape = 'circle', checked, label, onChange }: CheckBoxProps) => {
  const id = useId();

  return (
    <div className={styles.Wrapper} data-background={shape === 'circle'} data-checked={checked}>
      <input
        className={styles.CheckBox}
        type={'checkbox'}
        checked={checked}
        id={id}
        onChange={() => onChange(!checked)}
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
