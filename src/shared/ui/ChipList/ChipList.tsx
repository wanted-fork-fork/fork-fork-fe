import { Chip } from 'src/shared/ui/Chip/Chip';
import { InputTriggerChip } from 'src/shared/ui/Chip/InputTriggerChip/InputTriggerChip';
import { useState } from 'react';
import { InputBottomSheet } from 'src/shared/ui/InputBottomSheet/InputBottomSheet';

type Props<T extends { name: string }> = {
  defaultList: T[];
  selectedList: T[];
  setSelectedList: (selected: T[]) => void;
  makeItem: (itemName: string) => T;
  hasItem?: (itemList: T[], targetItem: T) => boolean;
  customInputTitle: string;
  customInputPlaceholder: string;
};

export const ChipList = <T extends { name: string }>({
  defaultList,
  selectedList,
  setSelectedList,
  makeItem,
  hasItem = (list, item) => list.includes(item),
  customInputTitle,
  customInputPlaceholder,
}: Props<T>) => {
  const [customList, setCustomList] = useState<T[]>(selectedList.filter((item) => !defaultList.includes(item)));

  const [openInputBottomSheet, setOpenInputBottomSheet] = useState(false);

  const onSelectItem = (item: T) => {
    const isSelectedItem = hasItem(selectedList, item);
    if (!isSelectedItem) {
      if (!hasItem(defaultList, item)) {
        setCustomList((prev) => [...prev, item]);
      }
      setSelectedList([...selectedList, item]);
      return;
    }

    if (hasItem(customList, item)) {
      setCustomList((prev) => prev.filter((h) => h !== item));
    }

    setSelectedList(selectedList.filter((h) => h !== item));
  };

  const onClickInputTrigger = () => setOpenInputBottomSheet(true);

  const onSubmitCustomItem = (name: string) => {
    const newItem = makeItem(name);
    onSelectItem(newItem);
    setOpenInputBottomSheet(false);
  };

  return (
    <>
      {defaultList.map((item) => (
        <Chip key={item.name} selected={selectedList.includes(item)} onClick={() => onSelectItem(item)}>
          {item.name}
        </Chip>
      ))}
      {customList.map((item) => (
        <Chip key={item.name} selected={selectedList.includes(item)} onClick={() => onSelectItem(item)}>
          {item.name}
        </Chip>
      ))}
      <InputTriggerChip onClick={onClickInputTrigger} />
      <InputBottomSheet
        open={openInputBottomSheet}
        title={customInputTitle}
        placeholder={customInputPlaceholder}
        submitText={'추가'}
        onSubmit={onSubmitCustomItem}
        onClose={() => setOpenInputBottomSheet(false)}
      />
    </>
  );
};
