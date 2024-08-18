import { InfoBox } from 'src/shared/ui/InfoBox/InfoBox';
import styles from './UploadLoadingPage.module.css';
import { useEffect } from 'react';
import { useActionData, useSubmit } from '@remix-run/react';
import { action } from 'src/app/routes/form.$key';
import { convertProfileToDto } from 'src/entities/profile/model/convertProfileToDto';
import { convertIdealPartnerToDto } from 'src/entities/ideal_partner/model/convertIdealPartnerToDto';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';

export const UploadLoadingPage = ({
  name,
  linkKey,
  onComplete,
}: {
  name: string;
  linkKey: string;
  onComplete: () => void;
}) => {
  const result = useActionData<typeof action>();
  const submit = useSubmit();

  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);

  useEffect(() => {
    submit(
      {
        linkKey,
        userInfo: JSON.stringify(convertProfileToDto(profile, [])),
        idealPartner: JSON.stringify(convertIdealPartnerToDto(idealPartner, [])),
      },
      { method: 'post' },
    );
  }, []);

  useEffect(() => {
    if (result?.status === 200) {
      onComplete();
    }
  }, [onComplete, result?.status]);

  return (
    <div className={styles.Wrapper}>
      <div className={styles.TitleSection}>
        <h2>{name}님의 정보를 업로드하고 있습니다.</h2>
        <p>
          업로드 중에 나가면 정보가 사라져요!
          <br />
          잠시만 기다려주세요.
        </p>
      </div>
      <div className={styles.ImageSection}>
        <img src={'/images/googoo_2.gif'} alt={'타자를 치는 구구'} />
        <p>0%</p>
      </div>
      <InfoBox radiusSize="S">
        <h3>막간 소개팅 꿀팁</h3>
        <p>꿀팁 들어갈 장소</p>
      </InfoBox>
    </div>
  );
};
