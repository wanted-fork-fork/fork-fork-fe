import { Radio, RadioProps } from 'src/shared/ui/Radio/Radio';
import { Input } from 'src/shared/ui/Input/Input';
import styles from 'src/processes/my_profile/JobForm/JobForm.module.css';
import { useRef } from 'react';

type RadioWithInputProps = RadioProps & {
  inputPlaceholder?: string;
  inputValue?: string;
  onChangeInputValue?: (value: string) => void;
};

export const RadioWithInput = ({ inputPlaceholder, inputValue, onChangeInputValue, ...props }: RadioWithInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Radio {...props} />
      {props.checked && (
        <Input
          ref={inputRef}
          className={styles.Input}
          placeholder={inputPlaceholder}
          value={inputValue}
          onChange={(e) => onChangeInputValue?.(e.target.value)}
        />
      )}
    </>
  );
};
