import styles from 'src/domains/candidates/components/GenerateFormLink/GenerateFormLink.module.css';
import { Close, Edit, Share } from 'src/shared/ui/icons';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { lazy, Suspense, useState } from 'react';
import { Link } from '@remix-run/react';
import { ProfileAddFloatingButton } from 'src/domains/candidates/components/GenerateFormLink/ProfileAddFloatingButton';

const GenerateFormLinkBottomSheet = lazy(async () => {
  const module = await import('src/domains/candidates/components/GenerateFormLink/GenerateFormLinkBottomSheet');
  return { default: module.GenerateFormLinkBottomSheet };
});

export const GenerateFormLink = () => {
  const [isTriggerOpen, setTriggerOpen] = useState(false);

  const [isOnceOpened, setIsOnceOpened] = useState(false);
  const { value: isOpen, setFalse: onClose, setTrue: open } = useBoolean(false);

  const onClick = () => {
    setIsOnceOpened(true);
    open();
  };

  return (
    <>
      {!isTriggerOpen && <ProfileAddFloatingButton onClick={() => setTriggerOpen(true)} />}
      {isTriggerOpen && (
        <div className={styles.Dim} onClick={() => setTriggerOpen(false)}>
          <div className={styles.DimButtonWrapper}>
            <Link to={'/form/me'}>
              <button className={styles.FloatingButtonWithText}>
                <span>직접 입력하기</span>
                <div className={styles.Icon}>
                  <Edit color={'white'} />
                </div>
              </button>
            </Link>
            <button className={styles.FloatingButtonWithText} onClick={onClick}>
              <span>입력 요청하기</span>
              <div className={styles.Icon}>
                <Share color={'white'} />
              </div>
            </button>
            <button className={styles.FloatingButtonNeutral} onClick={() => setTriggerOpen(false)}>
              <div className={styles.Icon} data-neutral={true}>
                <Close />
              </div>
            </button>
          </div>
        </div>
      )}
      <Suspense fallback={<></>}>
        {isOnceOpened && <GenerateFormLinkBottomSheet isOpen={isOpen} onClose={onClose} />}
      </Suspense>
    </>
  );
};
