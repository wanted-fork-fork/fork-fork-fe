import { Header } from 'src/shared/ui/layout/Header/Header';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateAge, convertDateObjectToDate } from 'src/shared/functions/date';
import { MyProfile } from 'src/entities/candidates/info/entities/models/myProfileStore';

export const ProfilePageHeader = ({
  profile,
  showTitle,
  suffix,
  prefix,
}: {
  profile: MyProfile;
  showTitle: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}) => {
  const { t } = useTranslation();

  const age = calculateAge(convertDateObjectToDate(profile.birthDate));

  return (
    <>
      <Header prefixSlot={prefix} suffixSlot={suffix}>
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
