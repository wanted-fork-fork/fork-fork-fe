import { Sheet } from 'react-modal-sheet';
import styles from './InputBottomSheet.module.css';
import { ArrowLeft, Close } from 'src/shared/ui/icons';
import { Input } from 'src/shared/ui/Input/Input';
import { Button } from 'src/shared/ui/Button/Button';
import { useState } from 'react';

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
    <Sheet detent={'content-height'} isOpen={open} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header className={styles.Header}>
          <Button variant={'ghost'} color={'neutral'} widthType={'hug'} size={'fit'} onClick={onClose}>
            <ArrowLeft width={24} />
          </Button>
          <Button variant={'ghost'} color={'neutral'} widthType={'hug'} size={'fit'} onClick={onClose}>
            <Close width={24} />
          </Button>
        </Sheet.Header>
        <Sheet.Content className={styles.Content}>
          <h2>{title}</h2>
          <Input placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />
          <Button disabled={!value} variant={'filled'} color={'primary'} widthType={'fill'} onClick={handleSubmit}>
            {submitText}
          </Button>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};
