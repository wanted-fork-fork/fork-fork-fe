import { Link } from '@remix-run/react';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { Button } from 'src/shared/ui/Button/Button';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { PropsWithChildren, ReactNode } from 'react';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { useTranslation } from 'react-i18next';
import { calculateAge, convertDateObjectToDate } from 'src/shared/vo/date';

export const ProfilePageHeader = ({
  profile,
  showTitle,
  suffix,
}: {
  profile: MyProfile;
  showTitle: boolean;
  suffix?: ReactNode;
}) => {
  const { t } = useTranslation();

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
        suffixSlot={suffix}
      >
        {showTitle ? (
          <p>
            {profile.name}({t(profile.gender)}, {age})
          </p>
        ) : (
          <span />
        )}
      </Header>
    </>
  );
};

const IconButton = ({ children, onClick }: PropsWithChildren<{ onClick?: () => void }>) => (
  <Button variant={'ghost'} widthType={'hug'} size={'fit'} color={'neutral'} onClick={onClick}>
    {children}
  </Button>
);
