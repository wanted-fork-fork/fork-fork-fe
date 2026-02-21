import { ChangeEvent, ReactElement, useRef } from 'react';
import styles from './UploadTrigger.module.css';
import toast from 'react-hot-toast';

type UploadTriggerProps = {
  children: (onTriggerUpload: () => void) => ReactElement;
  onUploadFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  max?: number;
};

export const UploadTrigger = ({ onUploadFiles, accept, multiple, max, children }: UploadTriggerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onTriggerUpload = () => inputRef.current?.click();

  const onFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = Array.from(e.target.files ?? []);
    const filtered = fileUploaded
      .filter((file) => file.type.startsWith('image/'))
      .filter((file) => file.size < 3 * 1024 * 1024);

    if (filtered.length !== fileUploaded.length) {
      toast('5MB 미만의 사진 파일을 업로드해주세요');
    }

    onUploadFiles(filtered);
  };

  return (
    <>
      {children(onTriggerUpload)}
      <input
        ref={inputRef}
        className={styles.FileInput}
        onChange={onFileChanged}
        type={'file'}
        max={max}
        accept={accept}
        multiple={multiple}
      />
    </>
  );
};
