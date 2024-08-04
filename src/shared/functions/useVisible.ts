import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

export const useVisible = <T extends Element>(
  targetRef: MutableRefObject<T | null>,
  option: Partial<IntersectionObserverInit> = {},
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const observerCallback: IntersectionObserverCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      setVisible(entry.intersectionRatio > 0);
    });
  }, []);

  useEffect(() => {
    if (observerRef.current) return;
    if (!targetRef.current) return;
    observerRef.current = new IntersectionObserver(observerCallback, {
      ...option,
    });
    observerRef.current.observe(targetRef.current);
  });

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return visible;
};
