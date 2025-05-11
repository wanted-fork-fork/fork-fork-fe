import styles from './UploadLoadingPage.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useActionData, useSubmit } from '@remix-run/react';
import { action } from 'src/app/routes/form.$key';
import { Button } from 'src/shared/ui/Button/Button';
import { UploadLoadingPageView } from 'src/pages/form/complete/UploadLoadingPageView';
import { useUploadProfileImage } from 'src/shared/functions/useUploadProfileImage';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/entities/models/idealPartnerStore';
import { convertProfileToDto } from 'src/entities/candidates/info/entities/models/convertProfileToDto';
import { convertIdealPartnerToDto } from 'src/entities/candidates/ideal_partner/entities/models/convertIdealPartnerToDto';

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

  const { progress, upload: uploadFiles } = useUploadProfileImage();

  const upload = useCallback(async () => {
    const { profileImageResults, idealImageResults } = await uploadFiles(profile.images, idealPartner.images);

    submit(
      {
        linkKey,
        userInfo: JSON.stringify(convertProfileToDto(profile, profileImageResults)),
        idealPartner: JSON.stringify(convertIdealPartnerToDto(idealPartner, idealImageResults)),
      },
      { method: 'post' },
    );
  }, [idealPartner, linkKey, profile, submit, uploadFiles]);

  useEffect(() => {
    upload();
  }, []);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (result?.status === 200) {
      onComplete();
    } else if (result?.status) {
      setError(true);
    }
  }, [onComplete, result?.status]);

  return (
    <div className={styles.Wrapper}>
      {!error ? (
        <UploadLoadingPageView name={name} progress={progress} />
      ) : (
        <>
          <div className={styles.TitleSection}>
            <h2>업로드 도중 문제가 발생했습니다</h2>
            <p>다시 시도할까요?</p>
          </div>
          <Button
            widthType={'fill'}
            variant={'filled'}
            color={'primary'}
            onClick={() => {
              setError(false);
              upload();
            }}
          >
            재시도
          </Button>
        </>
      )}
    </div>
  );
};
