import styles from './TextArea.module.css';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

type TextAreaProps = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const TextArea = ({ ...props }: TextAreaProps) => {
  return (
    <div className={styles.Container}>
      <textarea className={styles.TextArea} {...props} />
    </div>
  );
};
