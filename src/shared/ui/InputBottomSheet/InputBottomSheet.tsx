import { Input } from 'src/shared/ui/Input/Input';
import { Button } from 'src/shared/ui/Button/Button';
import { useState } from 'react';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import styles from './InputBottomSheet.module.css';

type InputBottomSheetProps = {
  open: boolean;
  title: string;
  placeholder: string;
  submitText: string;
  onSubmit: (value: string) => void;
  onClose: () => void;
};

export const InputBottomSheet = ({
  open,
  title,
  placeholder,
  submitText,
  onSubmit,
  onClose,
}: InputBottomSheetProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    setValue('');
    onSubmit(value);
  };

  return (
    <BottomSheet className={styles.Sheet} detent={'content-height'} isOpen={open} onClose={onClose}>
      <BottomSheet.Header onClose={onClose} />
      <BottomSheet.Content
        className={styles.Content}
        footerSlot={
          <Button disabled={!value} variant={'filled'} color={'primary'} widthType={'fill'} onClick={handleSubmit}>
            {submitText}
          </Button>
        }
      >
        <h2>{title}</h2>
        <Input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
      </BottomSheet.Content>
    </BottomSheet>
  );
};
