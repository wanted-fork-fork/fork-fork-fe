import { useState } from 'react';

export const useMultiSelectToggle = <T>(initialState: T[] = [], compare?: (a: T, b: T) => boolean) => {
  const [list, setList] = useState<T[]>(initialState);

  const toggle = (value: T) => {
    setList((prev) =>
      prev.some((x) => (compare ? compare(x, value) : x === value))
        ? prev.filter((x) => (compare ? !compare(x, value) : x !== value))
        : [...prev, value],
    );
  };

  return { list, toggle };
};
