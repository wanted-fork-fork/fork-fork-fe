import { useEffect, useMemo } from 'react';

export const useDataUrlListFromFiles = (files: File[]) => {
  const dataUrlList = useMemo(() => {
    return files.map((file) => URL.createObjectURL(file));
  }, [files]);

  useEffect(() => {
    return () => dataUrlList.forEach((url) => URL.revokeObjectURL(url));
  }, [dataUrlList]);

  return dataUrlList;
};
