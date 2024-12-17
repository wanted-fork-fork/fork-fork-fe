import { UploadTrigger } from 'src/shared/ui/UploadTrigger/UploadTrigger';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import { Close, Plus } from 'src/shared/ui/icons';
import styles from './AvatarList.module.css';
import { AvatarWithModal } from 'src/shared/ui/AvatarWithModal/AvatarWithModal';
import { ImageDto } from 'src/types';
import { ImageModal } from 'src/shared/ui/ImageModal/ImageModal';
import { useMemo, useState } from 'react';

type Props = {
  imageDtoList: ImageDto[];
  setFiles?: (getState: (prevFiles: File[]) => File[]) => void;
  onClickRemove?: (url: string, fileIdx?: number) => void;
  maxFileCount?: number;
};

export const AvatarList = ({ imageDtoList = [], setFiles, onClickRemove, maxFileCount }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  const handleClickAvatar = (idx: number) => {
    setInitialSlide(idx);
    setShowModal(true);
  };

  const image = useMemo(() => imageDtoList.map((dto) => ({ src: dto.url, alt: dto.url })), [imageDtoList]);

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
      {imageDtoList.map(({ url, imageId }, idx) => (
        <AvatarWithModal
          key={url}
          fallback={''}
          shape={'roundedSquare'}
          size={72}
          src={url}
          onClick={() => handleClickAvatar(idx)}
          actionSlot={
            onClickRemove && (
              <Close onClick={() => onClickRemove?.(url, !isNaN(Number(imageId)) ? Number(imageId) : undefined)} />
            )
          }
        />
      ))}
      <ImageModal
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        imageList={image}
        initialSlide={initialSlide}
      />
    </div>
  );
};
