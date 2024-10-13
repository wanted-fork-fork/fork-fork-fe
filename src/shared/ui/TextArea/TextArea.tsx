import styles from './TextArea.module.css';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

type TextAreaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const TextArea = ({ ...props }: TextAreaProps) => {
  const length = typeof props.value === 'string' ? props.value.length : 0;
  return (
    <div className={styles.Container}>
      <textarea className={styles.TextArea} {...props} />
      {props.maxLength && (
        <div className={styles.TextLength}>
          {length ?? 0}/{props.maxLength}
        </div>
      )}
    </div>
  );
};
