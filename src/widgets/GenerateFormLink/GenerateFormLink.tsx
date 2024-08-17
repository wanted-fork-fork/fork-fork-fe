import styles from 'src/features/copy_profile_link/CopyProfileFormLinkButton.module.css';
import { Close, Plus } from 'src/shared/ui/icons';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getLinkByMatchMakerId, regenerateLinkKey, updateLinkOpen } from 'src/types';
import { Button } from 'src/shared/ui/Button/Button';
import { Suspense, useEffect, useRef, useState } from 'react';

export const GenerateFormLink = () => {
  const { value: isOpen, setFalse: onClose, setTrue: onClick } = useBoolean(false);

  return (
    <>
      <button className={styles.FloatingButton} onClick={onClick}>
        <Plus color={'#fff'} />
      </button>
      <BottomSheet isOpen={isOpen} onClose={onClose}>
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
  const { data, status } = useQuery({ queryFn: getLinkByMatchMakerId, queryKey: [] });
  const { mutateAsync: regenerateLinkMutation } = useMutation({ mutationFn: regenerateLinkKey });
  const { mutateAsync: updateLinkOpenMutation } = useMutation({ mutationFn: updateLinkOpen });

  const [currentKey, setCurrentKey] = useState('');
  const [currentOpenState, setCurrentOpenState] = useState(false);
  const linkId = useRef<string | null>(null);

  useEffect(() => {
    if (status === 'success') {
      setCurrentKey(data.linkKey);
      setCurrentOpenState(data.isOpen);
    }
  }, [data, status]);

  linkId.current = data?.linkId ?? null;

  const onToggleLinkOpen = async () => {
    if (!data || !linkId.current) return;
    await updateLinkOpenMutation({ isOpen: !currentOpenState, linkId: linkId.current });
    alert(`링크를 ${currentOpenState ? '비' : ''}활성화했습니다`);
  };

  const onClickCopyLink = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(`${location.host}/form/${currentKey}`);
    alert('복사되었습니다');
  };

  const onClickRegenerate = async () => {
    const data = await regenerateLinkMutation({});
    setCurrentKey(data.linkKey);
    setCurrentOpenState(data.isOpen);
    linkId.current = data.linkId;
    alert('링크를 재생성했습니다');
  };

  if (status === 'pending') {
    return <>loading...</>;
  }

  if (status === 'error') {
    return <>error</>;
  }

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
        <input type={'checkbox'} checked={data.isOpen} onClick={onToggleLinkOpen} />
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
