import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { Suspense } from 'react';
import { useFormLink } from 'src/widgets/GenerateFormLink/useFormLink';
import toast from 'react-hot-toast';
import { KakaoSdk } from 'src/shared/lib/kakao/KakaoSdk';
import { GenerateFormBottomSheetContentView } from 'src/widgets/GenerateFormLink/GenerateFormBottomSheetContentView';

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
    <GenerateFormBottomSheetContentView
      isOpen={isOpen}
      onClickShareKakao={onClickShareKakao}
      onClickCopyLink={onClickCopyLink}
      onClickRegenerate={onClickRegenerate}
      onToggleLinkOpen={onToggleLinkOpen}
    />
  );
};
