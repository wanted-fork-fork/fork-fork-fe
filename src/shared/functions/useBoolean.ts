import { useCallback, useState } from 'react';

export const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setTrue: useCallback(() => setValue(true), []),
    setFalse: useCallback(() => setValue(false), []),
    toggle: useCallback(() => setValue((prev) => !prev), []),
    setValue,
  };
};
