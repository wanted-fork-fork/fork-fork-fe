import styles from './CheckBox.module.css';
import { useId } from 'react';
import { Check } from 'src/shared/ui/icons';

type CheckBoxProps = {
  checked: boolean;
  label: string;
};

export const CheckBox = ({ checked, label }: CheckBoxProps) => {
  const id = useId();
  return (
    <>
      <input className={styles.CheckBox} type={'checkbox'} checked={checked} id={id} />
      <label className={styles.Label} htmlFor={id}>
        <span className={styles.CheckMark}>
          <Check />
        </span>
        {label}
      </label>
    </>
  );
};
