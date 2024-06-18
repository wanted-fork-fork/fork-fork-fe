import { ChangeEvent, ReactElement, useRef } from 'react';
import styles from './UploadTrigger.module.css';

type UploadTriggerProps = {
  children: (onTriggerUpload: () => void) => ReactElement;
  onUploadFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
};

export const UploadTrigger = ({ onUploadFiles, accept, multiple, children }: UploadTriggerProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onTriggerUpload = () => inputRef.current?.click();

  const onFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const fileUploaded = Array.from(e.target.files ?? []);
    onUploadFiles(fileUploaded);
  };

  return (
    <>
      {children(onTriggerUpload)}
      <input
        ref={inputRef}
        className={styles.FileInput}
        onChange={onFileChanged}
        type={'file'}
        accept={accept}
        multiple={multiple}
      />
    </>
  );
};
