import styles from 'src/features/copy_profile_link/CopyProfileFormLinkButton.module.css';
import { Close, Plus } from 'src/shared/ui/icons';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { Button } from 'src/shared/ui/Button/Button';
import { Suspense } from 'react';
import { useFormLink } from 'src/widgets/GenerateFormLink/useFormLink';

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
    alert(`링크를 ${isOpen ? '비' : ''}활성화했습니다`);
  };

  const onClickCopyLink = async () => {
    await navigator.clipboard.writeText(await getLink());
    alert('복사되었습니다');
  };

  const onClickRegenerate = async () => {
    await regenerateLink();
    alert('링크를 재생성했습니다');
  };

  return (
    <>
      <h2>
        소개팅을 원하는 지인에게
        <br />
        자기소개 입력 요청을 보내보세요.
      </h2>
      <small>소개를 받고싶어 하는 지인의 정보를 저장하세요.</small>
      <button onClick={onClickCopyLink}>링크 복사</button>
      <h3>링크 설정</h3>
      <div>
        <h4>링크 활성화</h4>
        <input type={'checkbox'} checked={isOpen} onClick={onToggleLinkOpen} />
      </div>
      <div>
        <h4>새로운 링크 생성</h4>
        <Button variant={'ghost'} widthType={'hug'} color={'primary'} size={'fit'} onClick={onClickRegenerate}>
          <Close />
        </Button>
      </div>
    </>
  );
};
