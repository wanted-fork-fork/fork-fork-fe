import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { Suspense } from 'react';
import { useFormLink } from 'src/domains/candidates/components/GenerateFormLink/useFormLink';
import toast from 'react-hot-toast';
import { KakaoSdk } from 'src/shared/lib/kakao/KakaoSdk';
import { GenerateFormBottomSheetContentView } from 'src/domains/candidates/components/GenerateFormLink/GenerateFormBottomSheetContentView';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';
import { useBoolean } from 'src/shared/functions/useBoolean';

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
  const {
    value: isOpenRegenerateConfirm,
    setTrue: openRegenerateConfirm,
    setFalse: closeRegenerateConfirm,
  } = useBoolean(false);
  const {
    value: isOpenDisableLinkConfirm,
    setTrue: openDisableLinkConfirm,
    setFalse: closeDisableLinkConfirm,
  } = useBoolean(false);

  const { isOpen, getLink, regenerateLink, updateLinkOpenState } = useFormLink();

  const onToggleLinkOpen = async () => {
    await updateLinkOpenState(!isOpen);
    toast.success(`링크를 ${isOpen ? '비' : ''}활성화했습니다`, { icon: null });

    closeDisableLinkConfirm();
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

    closeRegenerateConfirm();
  };

  return (
    <>
      <GenerateFormBottomSheetContentView
        isOpen={isOpen}
        onClickShareKakao={onClickShareKakao}
        onClickCopyLink={onClickCopyLink}
        onClickRegenerate={openRegenerateConfirm}
        onToggleLinkOpen={(value) => (value ? onToggleLinkOpen() : openDisableLinkConfirm())}
      />
      <ConfirmModal
        title={'새로운 링크 주소를 생성합니다.'}
        description={'새로운 링크를 생성하면\n이전에 공유한 링크는 사용할 수 없어요.'}
        show={isOpenRegenerateConfirm}
        confirmText={'확인'}
        onConfirm={onClickRegenerate}
        cancelText={'취소'}
        onCancel={closeRegenerateConfirm}
      />
      <ConfirmModal
        title={'링크 사용을 차단합니다.'}
        description={'링크 사용을 차단하면 페이지 접속 및\n정보 입력을 할 수 없어요.'}
        show={isOpenDisableLinkConfirm}
        confirmText={'확인'}
        onConfirm={onToggleLinkOpen}
        cancelText={'취소'}
        onCancel={closeDisableLinkConfirm}
      />
    </>
  );
};
