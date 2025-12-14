import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import styles from './SoloStateButton.module.css';
import { Menu } from 'src/shared/ui/Menu/Menu';
import { ArrowDown } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { DetailedInfoUserInfoStatus, updateInfoStatus } from 'src/types';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRevalidator } from '@remix-run/react';

export const SoloStateButton = ({ infoId, status }: { infoId: string; status: DetailedInfoUserInfoStatus | null }) => {
  const { value: showBottomSheet, setTrue: open, setFalse: close } = useBoolean(false);

  const { revalidate } = useRevalidator();

  const { mutate, isPending } = useMutation({
    mutationFn: updateInfoStatus,
    onSuccess: () => {
      toast.success('연애 상태가 변경되었습니다.');
      revalidate();
      close();
    },
  });

  const handleChangeStatus = (status: DetailedInfoUserInfoStatus | undefined) => {
    if (isPending) {
      return;
    }
    mutate({ status, infoId });
  };

  return (
    <>
      <button type={'button'} className={styles.SelectButton} onClick={open}>
        <span>{status === 'IN_RELATIONSHIP' ? '연애중' : '솔로'}</span>
        <ArrowDown width={20} height={20} color={Theme.color.neutral50} />
      </button>
      <BottomSheet detent={'content-height'} isOpen={showBottomSheet} onClose={close}>
        <BottomSheet.Content className={styles.SheetContent}>
          <Menu
            key={'IN_RELATIONSHIP'}
            name={'연애중'}
            selected={status === 'IN_RELATIONSHIP'}
            onClick={() => handleChangeStatus('IN_RELATIONSHIP')}
          />
          <Menu key={'null'} name={'솔로'} selected={status === null} onClick={() => handleChangeStatus(undefined)} />
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
