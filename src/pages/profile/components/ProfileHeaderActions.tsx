import styles from 'src/pages/profile/ProfilePage.module.css';
import { Delete, Edit, Menu, Share } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { Popover } from 'src/shared/ui/Popover/Popover';
import { Link, useNavigate } from '@remix-run/react';
import { Button } from 'src/shared/ui/Button/Button';
import { Modal } from 'src/shared/ui/Modal/Modal';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { deleteInfo, saveSharing } from 'src/types';
import { ProfileShareBottomSheet } from 'src/entities/candidates/_common/components/ProfileShare/ProfileShareBottomSheet';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';

type Props = {
  infoId: string;
  name: string;
};

export const ProfileHeaderActions = ({ infoId, name }: Props) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isShareOpen, setShareOpen] = useState(false);

  const { mutateAsync: deleteMutation } = useMutation({
    mutationFn: deleteInfo,
  });

  const onClickDelete = async () => {
    await deleteMutation(infoId);
    navigate('/');
    toast.success('정보가 삭제되었습니다.', { icon: null });
  };

  return (
    <>
      <div className={styles.HeaderIconSection}>
        <IconButton onClick={() => setShareOpen(true)}>
          <Share color={Theme.color.neutral50} />
        </IconButton>
        <Popover
          anchorElement={
            <IconButton>
              <Menu color={Theme.color.neutral50} />
            </IconButton>
          }
          contentElement={
            <>
              <Link to={'edit'}>
                <Button
                  variant={'ghost'}
                  widthType={'fill'}
                  color={'neutral'}
                  prefixSlot={<Edit color={Theme.color.neutral90} />}
                >
                  정보 수정
                </Button>
              </Link>
              <Button
                variant={'ghost'}
                widthType={'fill'}
                color={'neutral'}
                prefixSlot={<Delete color={Theme.color.neutral60} />}
                className={styles.DeleteButton}
                onClick={() => setDeleteModalOpen(true)}
              >
                삭제하기
              </Button>
            </>
          }
        />
      </div>
      <Modal
        wrapperClassName={styles.DeleteModal}
        showModal={isDeleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
      >
        <div className={styles.DeleteModalBody}>
          <h2>{name}님의 정보를 삭제할까요?</h2>
          <p>삭제한 이후 복구할 수 없습니다.</p>
        </div>
        <div className={styles.DeleteModalFooter}>
          <Button variant={'outline'} widthType={'fill'} color={'neutral'} onClick={() => setDeleteModalOpen(false)}>
            취소
          </Button>
          <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={onClickDelete}>
            삭제
          </Button>
        </div>
      </Modal>
      <ProfileShareBottomSheet
        isOpen={isShareOpen}
        onClose={() => setShareOpen(false)}
        infoId={infoId}
        saveSharing={saveSharing}
      />
    </>
  );
};
