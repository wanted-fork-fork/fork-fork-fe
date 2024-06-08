import { useLayoutEffect, useState } from 'react';

type ImageLoadingStatus = 'idle' | 'success' | 'error' | 'loading';
export const useImageLoadingStatus = (src?: string) => {
  const [loadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>('idle');

  useLayoutEffect(() => {
    if (!src) {
      setLoadingStatus('error');
      return;
    }

    let isMount = true;
    const image = new window.Image();

    const updateStatus = (status: ImageLoadingStatus) => {
      if (!isMount) return;
      setLoadingStatus(status);
    };

    setLoadingStatus('loading');
    image.onload = () => updateStatus('success');
    image.onerror = () => updateStatus('error');
    image.src = src;

    return () => {
      isMount = false;
    };
  }, [src]);

  return loadingStatus;
};
