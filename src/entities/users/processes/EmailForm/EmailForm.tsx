import { FormLayout } from 'src/pages/layout/FormLayout';
import { VerifyEmail } from 'src/entities/users/auths/components/VerifyEmail/VerifyEmail';
import styles from 'src/entities/users/processes/EmailForm/EmailForm.module.css';
import { sendCommonVerificationMail, verifyCommonVerificationMail } from 'src/types';
import { ReactNode } from 'react';

export const EmailForm = ({
  title,
  signUpKey,
  onSubmitEmail,
  onDuplicated,
}: {
  title: ReactNode;
  signUpKey: string;
  onSubmitEmail: (email: string, token?: string) => void;
  onDuplicated: (email: string, token?: string) => void;
}) => {
  return (
    <FormLayout.Body className={styles.Body}>
      <h2>{title}</h2>
      <VerifyEmail
        confirmButtonText={'다음'}
        onConfirm={onSubmitEmail}
        sendEmailVerifyCode={(data) => sendCommonVerificationMail({ ...data, key: signUpKey })}
        verifyEmailCode={async (data) => {
          const result = await verifyCommonVerificationMail({ ...data, key: signUpKey });
          return { data: result.data.isVerified, isDuplicated: result.data.isDuplicated, token: result.data.token };
        }}
        onDuplicated={onDuplicated}
      />
    </FormLayout.Body>
  );
};
