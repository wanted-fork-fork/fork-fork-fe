import styles from 'src/entities/candidates/info/processes/my_profile/QuestionForm/FormContent.module.css';
import { ChipList } from 'src/shared/ui/ChipList/ChipList';
import { useProfileFirstName } from 'src/entities/candidates/info/entities/libs/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';

const defaultDateStyleList = [
  '🧗 활동적인 데이트',
  '🏠 편안한 데이트',
  '🚗 근교 여행',
  '🥐 전국 유명 맛집 탐방',
  '😎 다양한 경험',
  '🖼️ 박물관 및 전시 구경',
].map((x) => ({
  name: x,
}));

const makeItem = (name: string) => ({
  name,
});

const hasItem = (itemList: { name: string }[], targetItem: { name: string }) =>
  itemList.some((item) => item.name === targetItem.name);

export const DateStyleForm = () => {
  const name = useProfileFirstName();
  const { dateStyle, setDateStyle } = useMyProfileStore(({ dateStyle, setDateStyle }) => ({ dateStyle, setDateStyle }));

  const selectedDateStyleList = dateStyle.map((x) => ({ name: x }));

  const onSelectDateStyle = (selected: { name: string }[]) => {
    setDateStyle(selected.map(({ name }) => name));
  };

  return (
    <div className={styles.ContentWrapper}>
      <div className={styles.TitleWrapper}>
        <h2>{name}님의 데이트 스타일은 어떤가요?</h2>
        <small>선택지에 없다면 직접 추가도 가능해요.</small>
      </div>
      <div className={styles.ChipList}>
        <ChipList
          defaultList={defaultDateStyleList}
          selectedList={selectedDateStyleList}
          setSelectedList={onSelectDateStyle}
          hasItem={hasItem}
          makeItem={makeItem}
          customInputTitle={'추가 할 데이트 스타일을 입력해주세요.'}
          customInputPlaceholder={'ex. 만들기 체험 활동, 자기계발...'}
        />
      </div>
    </div>
  );
};
