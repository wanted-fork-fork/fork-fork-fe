import { useState } from 'react';

export const useMultiSelectToggle = <T>(
  initialState: T[] = [],
  compare?: (a: T, b: T) => boolean,
  option?: { maxCount?: number },
) => {
  const [list, setList] = useState<T[]>(initialState);

  const toggle = (value: T) => {
    setList((prev) => {
      const isSelected = prev.some((x) => (compare ? compare(x, value) : x === value));
      if (isSelected) {
        return prev.filter((x) => (compare ? !compare(x, value) : x !== value));
      }
      if (!option?.maxCount || prev.length < option.maxCount) {
        return [...prev, value];
      }
      return prev;
    });
  };

  return { list, toggle, setList };
};
