import { FormLayout } from 'src/pages/layout/FormLayout';
import { VerifyEmail } from 'src/features/VerifyEmail/VerifyEmail';
import styles from './EmailForm.module.css';
import { sendEmailSignup, verifyEmailLogin } from 'src/types';

export const EmailForm = ({
  signUpKey,
  onSubmitEmail,
  onDuplicated,
}: {
  signUpKey: string;
  onSubmitEmail: (email: string) => void;
  onDuplicated: () => void;
}) => {
  return (
    <FormLayout.Body className={styles.Body}>
      <h2>
        구구에 오신 것을 환영합니다!
        <br />
        아이디로 사용할 이메일을 입력해주세요.
      </h2>
      <VerifyEmail
        confirmButtonText={'다음'}
        onConfirm={onSubmitEmail}
        sendEmailVerifyCode={(data) => sendEmailSignup({ ...data, key: signUpKey })}
        verifyEmailCode={async (data) => {
          const result = await verifyEmailLogin({ ...data, key: signUpKey });
          return { data: result.data.isVerified, isDuplicated: result.data.isDuplicated };
        }}
        onDuplicated={onDuplicated}
      />
    </FormLayout.Body>
  );
};
