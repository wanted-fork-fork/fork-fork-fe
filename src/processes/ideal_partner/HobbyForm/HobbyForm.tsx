import styles from './HobbyForm.module.css';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { ChipList } from 'src/shared/ui/ChipList/ChipList';
import { Hobby } from 'src/entities/profile/types/hobby';

type HobbyFormProps = {
  exampleHobbyList?: Hobby[];
};

export const HobbyForm = ({ exampleHobbyList = [] }: HobbyFormProps) => {
  const hobbies = useIdealPartnerStore((state) => state.hobbies);
  const setHobbies = useIdealPartnerStore((state) => state.setHobbies);

  return (
    <>
      <section className={styles.Container}>
        <ChipList
          defaultList={exampleHobbyList}
          selectedList={hobbies}
          setSelectedList={setHobbies}
          customInputTitle={'추가하실 취미를 입력해주세요.'}
          customInputPlaceholder={'취미 입력'}
          makeItem={(name) => ({ name })}
          hasItem={(list, target) => list.some((item) => item.name === target.name)}
        />
      </section>
    </>
  );
};
