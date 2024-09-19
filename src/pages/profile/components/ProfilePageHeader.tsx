import { Link } from '@remix-run/react';
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

export const ProfilePageHeader = ({
  profile,
  infoId,
  showTitle,
}: {
  infoId: string;
  profile: MyProfile;
  showTitle: boolean;
}) => {
  const { t } = useTranslation();
  const [isShareOpen, setShareOpen] = useState(false);

  const age = calculateAge(convertDateObjectToDate(profile.birthDate));

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
    </>
  );
};

const IconButton = ({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) => (
  <Button variant={'ghost'} widthType={'hug'} size={'fit'} color={'neutral'} onClick={onClick}>
    {children}
  </Button>
);
