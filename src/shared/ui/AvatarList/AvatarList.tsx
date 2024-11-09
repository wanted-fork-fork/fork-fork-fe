import { UploadTrigger } from 'src/shared/ui/UploadTrigger/UploadTrigger';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { Close, Plus } from 'src/shared/ui/icons';
import styles from './AvatarList.module.css';
import { AvatarWithModal } from 'src/shared/ui/AvatarWithModal/AvatarWithModal';
import { ImageDto } from 'src/types';

type Props = {
  imageDtoList: ImageDto[];
  setFiles?: (getState: (prevFiles: File[]) => File[]) => void;
  onClickRemove?: (url: string, fileIdx?: number) => void;
  maxFileCount?: number;
};

export const AvatarList = ({ imageDtoList = [], setFiles, onClickRemove, maxFileCount }: Props) => {
  const canAddFile = Boolean(setFiles && (!maxFileCount || imageDtoList.length < maxFileCount));

  const onFileChanged = (files: File[]) => {
    setFiles?.((prev) => [...prev, ...files].slice(0, maxFileCount));
  };

  return (
    <div className={styles.ImageContainer}>
      {canAddFile && (
        <UploadTrigger onUploadFiles={onFileChanged} accept={'image/*'} multiple>
          {(onClickUpload) => <Avatar fallback={<Plus />} shape={'roundedSquare'} size={72} onClick={onClickUpload} />}
        </UploadTrigger>
      )}
      {imageDtoList.map(({ url, imageId }) => (
        <AvatarWithModal
          key={url}
          fallback={''}
          shape={'roundedSquare'}
          size={72}
          src={url}
          actionSlot={
            <Close onClick={() => onClickRemove?.(url, isNaN(Number(imageId)) ? Number(imageId) : undefined)} />
          }
        />
      ))}
    </div>
  );
};
