import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { IconBoxButton } from 'src/shared/ui/IconBoxButton/IconBoxButton';
import { Link } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import Flex from 'src/shared/ui/Flex/Flex';
import styles from './GroupCreateCompleteModal.module.css';

export const GroupCreateCompleteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} detent={'content-height'}>
      <BottomSheet.Content>
        <Flex className={styles.Container} direction={'vertical'} gap={24}>
          <h3>그룹을 생성했습니다.</h3>
          <p>그룹 참여 링크를 보내고 후보자 공유를 시작하세요.</p>
          <div className={styles.ButtonList}>
            <IconBoxButton icon={<Link />} text={'링크 복사'} onClick={console.log} />
            <IconBoxButton
              icon={<img src="/images/kakao.png" alt="카카오톡으로 공유하기" width={29} height={29} />}
              iconBackgroundColor={Theme.color.kakao}
              text={'카카오톡 공유'}
              onClick={console.log}
            />
          </div>
        </Flex>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
