import { BottomSheet } from '../../shared/ui/BottomSheet/BottomSheet';
import { IconBoxButton } from '../../shared/ui/IconBoxButton/IconBoxButton';
import { Link } from '../../shared/ui/icons';
import { Theme } from '../../shared/styles/constants';
import styles from './ProfileShareBottomSheet.module.css';

export const ProfileShareBottomSheet = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} detent={'content-height'}>
      <BottomSheet.Header onClose={onClose} />
      <BottomSheet.Content className={styles.Container}>
        <div className={styles.TitleSection}>
          <h2>공유</h2>
          <p className={styles.Description}>소개를 받고싶어 하는 지인에게 정보를 공유해보세요.</p>
        </div>
        <div className={styles.ButtonWrapper}>
          <IconBoxButton icon={<Link />} text={'링크 복사'} onClick={() => {}} />
          <IconBoxButton
            icon={<img src="/images/kakao.png" alt="카카오톡으로 공유하기" width={29} height={29} />}
            iconBackgroundColor={Theme.color.kakao}
            text={'카카오톡 공유'}
            onClick={() => {}}
          />
        </div>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
