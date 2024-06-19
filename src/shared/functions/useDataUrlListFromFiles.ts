import { useEffect, useMemo, useRef } from 'react';

export const useDataUrlListFromFiles = (files: File[]) => {
  const fileToDataUrlMap = useRef<Map<File, string>>(new Map());

  const dataUrlList = useMemo(() => {
    return files.map((file) => {
      if (!fileToDataUrlMap.current.has(file)) {
        fileToDataUrlMap.current.set(file, URL.createObjectURL(file));
      }
      return fileToDataUrlMap.current.get(file);
    });
  }, [files]);

  useEffect(() => {
    return () => {
      Object.values(fileToDataUrlMap).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return dataUrlList;
};
