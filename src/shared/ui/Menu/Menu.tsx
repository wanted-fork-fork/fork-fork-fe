import styles from './Menu.module.css';

export const Menu = ({ name, selected, onClick }: { name: string; selected: boolean; onClick: () => void }) => {
  return (
    <button
      className={styles.Container}
      role={'menuitemradio'}
      type={'button'}
      aria-checked={selected}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
