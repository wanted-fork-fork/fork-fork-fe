import styles from 'src/entities/candidates/info/processes/HobbyForm/HobbyForm.module.css';
import { ChipList } from 'src/shared/ui/ChipList/ChipList';
import { ExampleHobbyList } from 'src/entities/candidates/_common/vo/hobby/constants/hobbies';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/_store/myProfileFormProcessStore';
import { Hobby } from 'src/entities/candidates/_common/vo/hobby/types/hobby';

export const HobbyForm = () => {
  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);

  const hobbies = useMyProfileStore((state) => state.hobbies);
  const setHobbies = useMyProfileStore((state) => state.setHobbies);

  const handleChangeHobby = (h: Hobby[]) => {
    setHobbies(h);
    addTouchedStep('PROFILE_HOBBY');
  };

  return (
    <section className={styles.Container}>
      <ChipList
        defaultList={ExampleHobbyList}
        selectedList={hobbies}
        setSelectedList={handleChangeHobby}
        customInputTitle={'추가하실 취미를 입력해주세요.'}
        customInputPlaceholder={'취미 입력'}
        makeItem={(name) => ({ name })}
        hasItem={(list, target) => list.some((item) => item.name === target.name)}
      />
    </section>
  );
};
