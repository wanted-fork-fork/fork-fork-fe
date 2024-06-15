import { useState } from 'react';

export const useMultiSelectToggle = <T>(initialState: T[] = []) => {
  const [list, setList] = useState<T[]>(initialState);

  const toggle = (value: T) => {
    setList((prev) => (prev.includes(value) ? prev.filter((x) => x !== value) : [...prev, value]));
  };

  return { list, toggle };
};
