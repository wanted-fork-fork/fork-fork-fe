import styles from './HobbyForm.module.css';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';
import { InputTriggerChip } from 'src/shared/ui/Chip/InputTriggerChip/InputTriggerChip';
import { InputBottomSheet } from 'src/shared/ui/InputBottomSheet/InputBottomSheet';
import { useState } from 'react';

export type Hobby = {
  name: string;
};

type HobbyFormProps = {
  hobbyList?: Hobby[];
};

export const HobbyForm = ({ hobbyList = [] }: HobbyFormProps) => {
  const { list: selectedHobbies, toggle: onClick } = useMultiSelectToggle<Hobby>([]);
  const [customHobbyList, setCustomHobbyList] = useState<Hobby[]>([]);

  const [openInputBottomSheet, setOpenInputBottomSheet] = useState(false);

  const onClickInputTrigger = () => setOpenInputBottomSheet(true);

  const onSubmitHobby = (hobbyName: string) => {
    setCustomHobbyList((prev) => [...prev, { name: hobbyName }]);
    setOpenInputBottomSheet(false);
  };

  return (
    <>
      <section className={styles.Container}>
        {hobbyList.map((hobby) => (
          <Chip key={hobby.name} selected={selectedHobbies.includes(hobby)} onClick={() => onClick(hobby)}>
            {hobby.name}
          </Chip>
        ))}
        {customHobbyList.map((hobby) => (
          <Chip key={hobby.name} selected={selectedHobbies.includes(hobby)} onClick={() => onClick(hobby)}>
            {hobby.name}
          </Chip>
        ))}
        <InputTriggerChip onClick={onClickInputTrigger} />
      </section>
      <InputBottomSheet
        open={openInputBottomSheet}
        title={'추가하실 취미를 입려해주세요.'}
        placeholder={'취미 입력'}
        submitText={'추가'}
        onSubmit={onSubmitHobby}
        onClose={() => setOpenInputBottomSheet(false)}
      />
    </>
  );
};
