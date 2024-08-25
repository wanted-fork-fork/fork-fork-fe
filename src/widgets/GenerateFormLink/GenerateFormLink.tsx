import styles from './GenerateFormLink.module.css';
import { Plus } from 'src/shared/ui/icons';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { lazy, Suspense, useState } from 'react';

const GenerateFormLinkBottomSheet = lazy(async () => {
  const module = await import('src/widgets/GenerateFormLink/GenerateFormLinkBottomSheet');
  return { default: module.GenerateFormLinkBottomSheet };
});

export const GenerateFormLink = () => {
  const [isOnceOpened, setIsOnceOpened] = useState(false);
  const { value: isOpen, setFalse: onClose, setTrue: open } = useBoolean(false);

  const onClick = () => {
    setIsOnceOpened(true);
    open();
  };

  return (
    <>
      <button className={styles.FloatingButton} onClick={onClick}>
        <Plus color={'#fff'} />
      </button>
      <Suspense fallback={<></>}>
        {isOnceOpened && <GenerateFormLinkBottomSheet isOpen={isOpen} onClose={onClose} />}
      </Suspense>
    </>
  );
};
