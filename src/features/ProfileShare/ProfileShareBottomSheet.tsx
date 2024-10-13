import { BottomSheet } from '../../shared/ui/BottomSheet/BottomSheet';
import { IconBoxButton } from '../../shared/ui/IconBoxButton/IconBoxButton';
import { Link } from '../../shared/ui/icons';
import { Theme } from '../../shared/styles/constants';
import styles from './ProfileShareBottomSheet.module.css';
import { useMutation } from '@tanstack/react-query';
import { saveSharing } from '../../types';
import toast from 'react-hot-toast';
import { copyLink, createSharedProfileLink } from '../../shared/functions/linkUtil';
import { KakaoSdk } from 'src/shared/lib/kakao/KakaoSdk';
import { useCallback } from 'react';

export const ProfileShareBottomSheet = ({
  isOpen,
  onClose,
  infoId,
}: {
  isOpen: boolean;
  onClose: () => void;
  infoId: string | null;
}) => {
  const { mutateAsync } = useMutation({
    mutationFn: saveSharing,
  });

  const generateLink = useCallback(async () => {
    if (!infoId) return;

    try {
      const result = await mutateAsync(infoId);
      return createSharedProfileLink(result.data.sharingId, true);
    } catch (e) {
      console.error(e);
    }
  }, [infoId, mutateAsync]);

  const onClickShareLink = async () => {
    const link = await generateLink();
    if (!link) return;

    await copyLink(link);
    toast.success('링크가 복사되었습니다', { icon: null });
  };

  const onClickShareKakao = async () => {
    const link = await generateLink();
    if (!link) return;

    await KakaoSdk.instance().shareMessage({ url: link });
  };

  return (
    <BottomSheet isOpen={isOpen && Boolean(infoId)} onClose={onClose} detent={'content-height'}>
      <BottomSheet.Header onClose={onClose} />
      <BottomSheet.Content className={styles.Container}>
        <div className={styles.TitleSection}>
          <h2>공유</h2>
          <p className={styles.Description}>소개를 받고싶어 하는 지인에게 정보를 공유해보세요.</p>
        </div>
        <div className={styles.ButtonWrapper}>
          <IconBoxButton icon={<Link />} text={'링크 복사'} onClick={onClickShareLink} />
          <IconBoxButton
            icon={<img src="/images/kakao.png" alt="카카오톡으로 공유하기" width={29} height={29} />}
            iconBackgroundColor={Theme.color.kakao}
            text={'카카오톡 공유'}
            onClick={onClickShareKakao}
          />
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
