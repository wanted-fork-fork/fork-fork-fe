import styles from './GenerateFormLink.module.css';
import { Plus } from 'src/shared/ui/icons';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { lazy } from 'react';

const GenerateFormLinkBottomSheet = lazy(async () => {
  const module = await import('src/widgets/GenerateFormLink/GenerateFormLinkBottomSheet');
  return { default: module.GenerateFormLinkBottomSheet };
});

export const GenerateFormLink = () => {
  const { value: isOpen, setFalse: onClose, setTrue: onClick } = useBoolean(false);

  return (
    <>
      <button className={styles.FloatingButton} onClick={onClick}>
        <Plus color={'#fff'} />
      </button>
      <GenerateFormLinkBottomSheet isOpen={isOpen} onClose={onClose} />
    </>
  );
};
