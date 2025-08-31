import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { IconBoxButton } from 'src/shared/ui/IconBoxButton/IconBoxButton';
import { Link } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import Flex from 'src/shared/ui/Flex/Flex';
import styles from './GroupCreateCompleteModal.module.css';
import { KakaoSdk } from 'src/shared/lib/kakao/KakaoSdk';
import toast from 'react-hot-toast';
import { ReactNode } from 'react';

export const GroupCreateCompleteModal = ({
  groupId,
  title = '그룹을 생성했습니다.',
  description = '그룹 참여 링크를 보내고 후보자 공유를 시작하세요.',
  isOpen,
  onClose,
}: {
  groupId?: string;
  title?: string;
  description?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const shareLink = `${location.origin}/group/join/${groupId}`;

  const onClickShareLink = async () => {
    setTimeout(() => {
      navigator.clipboard.writeText(shareLink).then(() => toast.success('링크가 복사되었습니다', { icon: null }));
    }, 0);
  };

  const onClickShareKakao = async () => {
    await KakaoSdk.instance().shareMessage({ url: shareLink });
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} detent={'content-height'}>
      <BottomSheet.Content>
        <Flex className={styles.Container} direction={'vertical'} gap={24}>
          <Flex direction={'vertical'} gap={8} align={'start'}>
            <h3>{title}</h3>
            <p>{description}</p>
          </Flex>
          <div className={styles.ButtonList}>
            <IconBoxButton icon={<Link />} text={'링크 복사'} onClick={onClickShareLink} />
            <IconBoxButton
              icon={<img src="/images/kakao.png" alt="카카오톡으로 공유하기" width={29} height={29} />}
              iconBackgroundColor={Theme.color.kakao}
              text={'카카오톡 공유'}
              onClick={onClickShareKakao}
            />
          </div>
        </Flex>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
