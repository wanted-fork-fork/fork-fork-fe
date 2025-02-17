import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { Suspense } from 'react';
import { useFormLink } from 'src/widgets/GenerateFormLink/useFormLink';
import toast from 'react-hot-toast';
import styles from 'src/widgets/GenerateFormLink/GenerateFormLink.module.css';
import { Link, Refresh } from 'src/shared/ui/icons';
import { Button } from 'src/shared/ui/Button/Button';
import { Theme } from 'src/shared/styles/constants';
import { IconBoxButton } from '../../shared/ui/IconBoxButton/IconBoxButton';
import { Toggle } from 'src/shared/ui/Toggle/Toggle';
import { KakaoSdk } from 'src/shared/lib/kakao/KakaoSdk';

export const GenerateFormLinkBottomSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} detent={'content-height'}>
      <BottomSheet.Header onClose={onClose} />
      <BottomSheet.Content>
        <Suspense fallback={'loading...'}>
          <GenerateFormBottomSheetContent />
        </Suspense>
      </BottomSheet.Content>
    </BottomSheet>
  );
};

const GenerateFormBottomSheetContent = () => {
  const { isOpen, getLink, regenerateLink, updateLinkOpenState } = useFormLink();

  const onToggleLinkOpen = async () => {
    await updateLinkOpenState(!isOpen);
    toast.success(`링크를 ${isOpen ? '비' : ''}활성화했습니다`, { icon: null });
  };

  const onClickCopyLink = async () => {
    await navigator.clipboard.writeText(await getLink());
    toast.success('복사되었습니다', { icon: null });
  };

  const onClickShareKakao = async () => {
    await KakaoSdk.instance().shareMessage({ url: await getLink() });
  };

  const onClickRegenerate = async () => {
    await regenerateLink();
    toast.success('링크를 재생성했습니다', { icon: null });
  };

  return (
    <div className={styles.Container}>
      <div className={styles.TitleSection}>
        <h2>
          소개팅을 원하는 지인에게
          <br />
          자기소개 입력 요청을 보내보세요.
        </h2>
        <small className={styles.Description}>소개를 받고싶어 하는 지인의 정보를 저장하세요.</small>
      </div>
      <div className={styles.ButtonWrapper}>
        <IconBoxButton
          icon={<Link className={styles.LinkIcon} color={'transparent'} data-disabled={!isOpen} />}
          text={'링크 복사'}
          onClick={onClickCopyLink}
          disabled={!isOpen}
          iconBackgroundColor={isOpen ? Theme.color.neutral90 : Theme.color.neutral10}
        />
        <IconBoxButton
          icon={
            <img
              src={isOpen ? '/images/kakao.png' : '/images/kakao_disabled.png'}
              alt="카카오톡으로 공유하기"
              width={29}
              height={29}
            />
          }
          iconBackgroundColor={isOpen ? Theme.color.kakao : Theme.color.neutral10}
          text={'카카오톡 공유'}
          onClick={onClickShareKakao}
          disabled={!isOpen}
        />
      </div>
      <div className={styles.LinkConfigSection}>
        <h3>링크 설정</h3>
        <div className={styles.LinkConfig}>
          <div>
            <p>
              <strong>링크 사용</strong>
            </p>
            <p>이전에 공유했던 링크 사용을 막을 때 사용합니다.</p>
          </div>
          <Toggle onToggle={onToggleLinkOpen} checked={isOpen} />
        </div>
        <div className={styles.LinkConfig}>
          <div>
            <p>
              <strong>새로운 링크 생성</strong>
            </p>
            <p>기존 링크와 다른 주소로 새로운 링크가 생성됩니다.</p>
          </div>
          <Button variant={'ghost'} widthType={'hug'} color={'primary'} size={'fit'} onClick={onClickRegenerate}>
            <Refresh color={isOpen ? Theme.color.primary : Theme.color.neutral30} />
          </Button>
        </div>
      </div>
    </div>
  );
};
