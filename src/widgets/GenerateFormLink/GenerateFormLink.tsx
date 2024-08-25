import styles from './GenerateFormLink.module.css';
import { Link, Plus, Refresh } from 'src/shared/ui/icons';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { Button } from 'src/shared/ui/Button/Button';
import { Suspense } from 'react';
import { useFormLink } from 'src/widgets/GenerateFormLink/useFormLink';
import toast from 'react-hot-toast';

export const GenerateFormLink = () => {
  const { value: isOpen, setFalse: onClose, setTrue: onClick } = useBoolean(false);

  return (
    <>
      <button className={styles.FloatingButton} onClick={onClick}>
        <Plus color={'#fff'} />
      </button>
      <BottomSheet isOpen={isOpen} onClose={onClose} detent={'content-height'}>
        <BottomSheet.Header onClose={onClose} />
        <BottomSheet.Content>
          <Suspense fallback={'loading...'}>
            <GenerateFormBottomSheetContent />
          </Suspense>
        </BottomSheet.Content>
      </BottomSheet>
    </>
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
        <button onClick={onClickCopyLink}>
          <div className={styles.ButtonIconWrapper}>
            <Link />
          </div>
          링크 복사
        </button>
        <button onClick={onClickCopyLink}>
          <div className={`${styles.ButtonIconWrapper} ${styles.Kakao}`}>
            <img src="/images/kakao.png" alt="카카오톡으로 공유하기" width={29} height={29} />
          </div>
          카카오톡 공유
        </button>
      </div>
      <div className={styles.LinkConfigSection}>
        <h3>링크 설정</h3>
        <div className={styles.LinkConfig}>
          <p>기존 링크 활성화</p>
          <input type={'checkbox'} checked={isOpen} onClick={onToggleLinkOpen} />
        </div>
        <div className={styles.LinkConfig}>
          <p>새로운 링크 생성</p>
          <Button variant={'ghost'} widthType={'hug'} color={'primary'} size={'fit'} onClick={onClickRegenerate}>
            <Refresh color={'#d752ff'} />
          </Button>
        </div>
      </div>
    </div>
  );
};
