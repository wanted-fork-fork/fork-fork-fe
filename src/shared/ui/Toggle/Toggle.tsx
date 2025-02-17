import { ToggleOff, ToggleOn } from 'src/shared/ui/icons';
import styles from './Toggle.module.css';

export const Toggle = ({ checked, onToggle }: { checked?: boolean; onToggle: (value: boolean) => void }) => {
  return (
    <label className={styles.Label}>
      {checked ? <ToggleOn color={'#fff'} /> : <ToggleOff color={'#fff'} />}
      <input className={styles.Input} type={'checkbox'} checked={checked} onChange={() => onToggle(!checked)} />
    </label>
  );
};
