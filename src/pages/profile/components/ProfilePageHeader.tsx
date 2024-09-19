import { Link, useNavigate } from '@remix-run/react';
import { ArrowLeft, Delete, Edit, Menu, Share } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import styles from 'src/pages/profile/ProfilePage.module.css';
import { Popover } from 'src/shared/ui/Popover/Popover';
import { Button } from 'src/shared/ui/Button/Button';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { PropsWithChildren, useState } from 'react';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { useTranslation } from 'react-i18next';
import { ProfileShareBottomSheet } from 'src/features/ProfileShare/ProfileShareBottomSheet';
import { calculateAge, convertDateObjectToDate } from 'src/shared/vo/date';
import { Modal } from 'src/shared/ui/Modal/Modal';
import { useMutation } from '@tanstack/react-query';
import { deleteInfo } from 'src/types';
import toast from 'react-hot-toast';

export const ProfilePageHeader = ({
  profile,
  infoId,
  showTitle,
}: {
  infoId: string;
  profile: MyProfile;
  showTitle: boolean;
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isShareOpen, setShareOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const age = calculateAge(convertDateObjectToDate(profile.birthDate));

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
      <Header
        prefixSlot={
          <Link to={'/'}>
            <IconButton>
              <ArrowLeft color={Theme.color.neutral50} />
            </IconButton>
          </Link>
        }
        suffixSlot={
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
                  <Button
                    variant={'ghost'}
                    widthType={'fill'}
                    color={'neutral'}
                    prefixSlot={<Edit color={Theme.color.neutral90} />}
                  >
                    정보 수정
                  </Button>
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
        }
      >
        {showTitle ? (
          <p>
            {profile.name}({t(profile.gender)}, {age})
          </p>
        ) : (
          <span />
        )}
      </Header>
      <ProfileShareBottomSheet isOpen={isShareOpen} onClose={() => setShareOpen(false)} infoId={infoId} />
      <Modal
        wrapperClassName={styles.DeleteModal}
        showModal={isDeleteModalOpen}
        closeModal={() => setDeleteModalOpen(false)}
      >
        <div className={styles.DeleteModalBody}>
          <h2>{profile.name}님의 정보를 삭제할까요?</h2>
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
    </>
  );
};

const IconButton = ({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) => (
  <Button variant={'ghost'} widthType={'hug'} size={'fit'} color={'neutral'} onClick={onClick}>
    {children}
  </Button>
);
