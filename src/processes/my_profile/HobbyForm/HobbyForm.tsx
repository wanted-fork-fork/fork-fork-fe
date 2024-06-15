import styles from './HobbyForm.module.css';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';
import { InputTriggerChip } from 'src/shared/ui/Chip/InputTriggerChip/InputTriggerChip';

export type Hobby = {
  name: string;
};

type HobbyFormProps = {
  hobbyList: Hobby[];
};

export const HobbyForm = ({ hobbyList }: HobbyFormProps) => {
  const { list: selectedHobbies, toggle: onClick } = useMultiSelectToggle<Hobby>([]);

  const onClickInputTrigger = () => console.log('open input');

  return (
    <section className={styles.Container}>
      {hobbyList.map((hobby) => (
        <Chip key={hobby.name} selected={selectedHobbies.includes(hobby)} onClick={() => onClick(hobby)}>
          {hobby.name}
        </Chip>
      ))}
      <InputTriggerChip onClick={onClickInputTrigger} />
    </section>
  );
};
