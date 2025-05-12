import styles from 'src/entities/candidates/_common/components/GenerateFormLink/GenerateFormLink.module.css';
import { Link, Refresh } from 'src/shared/ui/icons';
import { Button } from 'src/shared/ui/Button/Button';
import { Theme } from 'src/shared/styles/constants';
import { IconBoxButton } from 'src/shared/ui/IconBoxButton/IconBoxButton';
import { Toggle } from 'src/shared/ui/Toggle/Toggle';

export const GenerateFormBottomSheetContentView = ({
  isOpen,
  onClickCopyLink,
  onClickRegenerate,
  onClickShareKakao,
  onToggleLinkOpen,
}: {
  isOpen: boolean;
  onClickCopyLink: () => void;
  onClickRegenerate: () => void;
  onClickShareKakao: () => void;
  onToggleLinkOpen: (value: boolean) => void;
}) => {
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
      <div className={`${styles.ButtonWrapper} share-link-wrapper`}>
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
            <p>링크를 비활성화하면 더 이상 접근할 수 없습니다. </p>
          </div>
          <Toggle onToggle={onToggleLinkOpen} checked={isOpen} />
        </div>
        <div className={styles.LinkConfig}>
          <div>
            <p>
              <strong>새로운 링크 생성</strong>
            </p>
            <p>새 링크 발급 시 기존 링크는 사용할 수 없습니다.</p>
          </div>
          <Button variant={'ghost'} widthType={'hug'} color={'primary'} size={'fit'} onClick={onClickRegenerate}>
            <Refresh color={isOpen ? Theme.color.primary : Theme.color.neutral30} />
          </Button>
        </div>
      </div>
    </div>
  );
};
