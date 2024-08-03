import { UploadTrigger } from 'src/shared/ui/UploadTrigger/UploadTrigger';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { Close, Plus } from 'src/shared/ui/icons';
import styles from './AvatarList.module.css';
import { useDataUrlListFromFiles } from 'src/shared/functions/useDataUrlListFromFiles';
import { AvatarWithModal } from 'src/shared/ui/AvatarWithModal/AvatarWithModal';

type Props = {
  files: File[];
  setFiles?: (getState: (prevFiles: File[]) => File[]) => void;
  maxFileCount?: number;
};

export const AvatarList = ({ files = [], setFiles, maxFileCount }: Props) => {
  const dataUrlList = useDataUrlListFromFiles(files);

  const canAddFile = Boolean(setFiles && (!maxFileCount || files.length < maxFileCount));

  const onFileChanged = (files: File[]) => {
    setFiles?.((prev) => [...prev, ...files].slice(0, maxFileCount));
  };

  const onClickRemove = (targetIdx: number) => {
    setFiles?.((prev) => prev.filter((_, idx) => idx !== targetIdx));
  };

  return (
    <div className={styles.ImageContainer}>
      {canAddFile && (
        <UploadTrigger onUploadFiles={onFileChanged} accept={'image/*'} multiple>
          {(onClickUpload) => <Avatar fallback={<Plus />} shape={'roundedSquare'} size={72} onClick={onClickUpload} />}
        </UploadTrigger>
      )}
      {dataUrlList.map((url, idx) => (
        <AvatarWithModal
          key={url}
          fallback={''}
          shape={'roundedSquare'}
          size={72}
          src={url}
          actionSlot={<Close onClick={() => onClickRemove(idx)} />}
        />
      ))}
    </div>
  );
};
