import { FormLayout } from 'src/pages/layout/FormLayout';
import { VerifyEmail } from 'src/domains/auth/components/VerifyEmail/VerifyEmail';
import styles from 'src/domains/auth/processes/signup/EmailForm/EmailForm.module.css';
import { sendEmailSignup, verifyEmailLogin } from 'src/types';

export const EmailForm = ({
  signUpKey,
  onSubmitEmail,
  onDuplicated,
}: {
  signUpKey: string;
  onSubmitEmail: (email: string, token?: string) => void;
  onDuplicated: (email: string, token?: string) => void;
}) => {
  return (
    <FormLayout.Body className={styles.Body}>
      <h2>
        먼저 서비스 가입 여부를 확인할게요.
        <br />
        아이디로 사용한 이메일을 입력해주세요.
      </h2>
      <VerifyEmail
        confirmButtonText={'다음'}
        onConfirm={onSubmitEmail}
        sendEmailVerifyCode={(data) => sendEmailSignup({ ...data, key: signUpKey })}
        verifyEmailCode={async (data) => {
          const result = await verifyEmailLogin({ ...data, key: signUpKey });
          return { data: result.data.isVerified, isDuplicated: result.data.isDuplicated, token: result.data.token };
        }}
        onDuplicated={onDuplicated}
      />
    </FormLayout.Body>
  );
};
