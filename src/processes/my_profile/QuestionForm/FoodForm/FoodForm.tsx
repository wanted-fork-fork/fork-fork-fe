import styles from 'src/processes/my_profile/QuestionForm/FormContent.module.css';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { ChipList } from 'src/shared/ui/ChipList/ChipList';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';

const defaultFoodList = [
  '🥐 빵',
  '🍕 피자',
  '🍔 햄버거',
  '🌭 핫도그',
  '🥗 샐러드',
  '🥩 스테이크',
  '🍗 치킨',
  '🍛 커리',
  '🍜 라멘',
  '🍣 초밥',
  '🍝 파스타',
].map((x) => ({
  name: x,
}));

const makeItem = (name: string) => ({
  name,
});

const hasItem = (itemList: { name: string }[], targetItem: { name: string }) =>
  itemList.some((item) => item.name === targetItem.name);

export const FoodForm = () => {
  const name = useProfileFirstName();
  const { foods, setFoods } = useMyProfileStore(({ foods, setFoods }) => ({ foods, setFoods }));

  const selectedFoodList = foods.map((x) => ({ name: x }));

  const onSelectFood = (selected: { name: string }[]) => {
    setFoods(selected.map(({ name }) => name));
  };

  return (
    <div className={styles.ContentWrapper}>
      <div className={styles.TitleWrapper}>
        <h2>{name}님은 어떤 음식을 좋아하시나요?</h2>
        <small>선택지에 없다면 직접 추가도 가능해요.</small>
      </div>
      <div className={styles.ChipList}>
        <ChipList
          defaultList={defaultFoodList}
          selectedList={selectedFoodList}
          setSelectedList={onSelectFood}
          hasItem={hasItem}
          makeItem={makeItem}
          customInputTitle={'추가 할 음식을 입력해주세요.'}
          customInputPlaceholder={'ex. 봉골레 파스타,  타코...'}
        />
      </div>
    </div>
  );
};
