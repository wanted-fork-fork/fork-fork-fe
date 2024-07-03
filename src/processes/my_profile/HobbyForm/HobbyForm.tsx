import styles from './HobbyForm.module.css';
import { ChipList } from 'src/shared/ui/ChipList/ChipList';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { Hobby } from 'src/entities/profile/types/hobby';

type HobbyFormProps = {
  hobbyList?: Hobby[];
};

export const HobbyForm = ({ hobbyList = [] }: HobbyFormProps) => {
  const hobbies = useMyProfileStore((state) => state.hobbies);
  const setHobbies = useMyProfileStore((state) => state.setHobbies);

  return (
    <section className={styles.Container}>
      <ChipList
        defaultList={hobbyList}
        selectedList={hobbies}
        setSelectedList={setHobbies}
        customInputTitle={'추가하실 취미를 입력해주세요.'}
        customInputPlaceholder={'취미 입력'}
        makeItem={(name) => ({ name })}
        hasItem={(list, target) => list.some((item) => item.name === target.name)}
      />
    </section>
  );
};
