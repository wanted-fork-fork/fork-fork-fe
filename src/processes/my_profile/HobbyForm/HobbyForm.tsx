import styles from './HobbyForm.module.css';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';

export type Hobby = {
  name: string;
};

type HobbyFormProps = {
  hobbyList: Hobby[];
};

export const HobbyForm = ({ hobbyList }: HobbyFormProps) => {
  const { list: selectedHobbies, toggle: onClick } = useMultiSelectToggle<Hobby>([]);

  return (
    <section className={styles.Container}>
      {hobbyList.map((hobby) => (
        <Chip key={hobby.name} selected={selectedHobbies.includes(hobby)} onClick={() => onClick(hobby)}>
          {hobby.name}
        </Chip>
      ))}
    </section>
  );
};
