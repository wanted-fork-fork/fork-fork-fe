import styles from 'src/entities/candidates/info/processes/QuestionForm/FormContent.module.css';
import { ChipList } from 'src/shared/ui/ChipList/ChipList';
import { useProfileFirstName } from 'src/entities/candidates/info/utils/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';

const defaultPetList = ['🐶 강아지', '🐱고양이', '🦜 앵무새', '🐹 햄스터', '🐰 토끼', '🦎 파충류'].map((x) => ({
  name: x,
}));

const makeItem = (name: string) => ({
  name,
});

const hasItem = (itemList: { name: string }[], targetItem: { name: string }) =>
  itemList.some((item) => item.name === targetItem.name);

const isSameItem = (a: { name: string }, b: { name: string }) => a.name === b.name;

export const PetForm = () => {
  const name = useProfileFirstName();
  const { pets, setPets } = useMyProfileStore(({ pets, setPets }) => ({ pets, setPets }));

  const selectedPetList = pets.map((x) => ({ name: x }));

  const onSelectPet = (selected: { name: string }[]) => {
    setPets(selected.map(({ name }) => name));
  };

  return (
    <div className={styles.ContentWrapper}>
      <div className={styles.TitleWrapper}>
        <h2>
          {name}님과 함께 살고 있는
          <br />
          반려동물이 있나요?
        </h2>
      </div>
      <div className={styles.ChipList}>
        <ChipList
          defaultList={defaultPetList}
          selectedList={selectedPetList}
          setSelectedList={onSelectPet}
          hasItem={hasItem}
          isSameItem={isSameItem}
          makeItem={makeItem}
          customInputTitle={'추가 할 반려동물을 입력해주세요.'}
          customInputPlaceholder={'ex. 구피, 기니피그...'}
        />
      </div>
    </div>
  );
};
