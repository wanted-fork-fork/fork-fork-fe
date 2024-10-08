import { InfoBox } from 'src/shared/ui/InfoBox/InfoBox';
import styles from './UploadLoadingPage.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useActionData, useSubmit } from '@remix-run/react';
import { action } from 'src/app/routes/form.$key';
import { convertProfileToDto } from 'src/entities/profile/model/convertProfileToDto';
import { convertIdealPartnerToDto } from 'src/entities/ideal_partner/model/convertIdealPartnerToDto';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { useMutation } from '@tanstack/react-query';
import { ImageDto, uploadImage } from 'src/types';
import { Button } from 'src/shared/ui/Button/Button';

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

  const { mutateAsync: uploadMutation } = useMutation({
    mutationFn: uploadImage,
  });

  const uploadFileList = async (files: File[], onUpload: () => void) => {
    const results: ImageDto[] = [];
    // 한번에 너무 많이 요청하지 않도록 하나씩 업로드 요청
    for (const file of files) {
      try {
        const result = await uploadMutation({ image: file });
        onUpload();
        results.push(result.data);
      } catch (e) {
        console.error(e);
      }
    }
    return results;
  };

  const [progress, setProgress] = useState<number>(0);

  const upload = useCallback(async () => {
    const profileImageList = profile.images;
    const idealPartnerImageList = idealPartner.images;

    const total = profileImageList.length + idealPartnerImageList.length + 1;

    const [profileImageResults, idealImageResults] = await Promise.all([
      uploadFileList(profileImageList, () => {
        setProgress((prev) => prev + 1 / total);
      }),
      uploadFileList(idealPartnerImageList, () => {
        setProgress((prev) => prev + 1 / total);
      }),
    ]);

    submit(
      {
        linkKey,
        userInfo: JSON.stringify(convertProfileToDto(profile, profileImageResults)),
        idealPartner: JSON.stringify(convertIdealPartnerToDto(idealPartner, idealImageResults)),
      },
      { method: 'post' },
    );
  }, []);

  useEffect(() => {
    setProgress(0);
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
        <>
          <div className={styles.TitleSection}>
            <h2>{name}님의 정보를 업로드하고 있습니다.</h2>
            <p>
              업로드 중에 나가면 정보가 사라져요!
              <br />
              잠시만 기다려주세요.
            </p>
          </div>
          <div className={styles.ImageSection}>
            <img src={'/images/loading.gif'} alt={'타자를 치는 구구'} />
            <p>{(progress * 100).toFixed(0)}%</p>
          </div>
          <InfoBox radiusSize="S">
            <h3>막간 소개팅 꿀팁</h3>
            <p>꿀팁 들어갈 장소</p>
          </InfoBox>
        </>
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
              setProgress(0);
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
