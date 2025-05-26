import { FormLayout } from 'src/pages/layout/FormLayout';
import { SwitchCase } from 'src/shared/ui/SwitchCase';
import { EmailForm } from 'src/entities/users/processes/EmailForm/EmailForm';
import { useStep } from 'src/shared/functions/useStep';
import { useReducer, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from 'src/types';
import { SignUpNeededPage } from 'src/entities/users/auths/processes/reset_password/EmailExistErrorPage/SignUpNeededPage';
import { PasswordResetCompletePage } from 'src/entities/users/auths/processes/reset_password/SignUpCompletePage/PasswordResetCompletePage';
import { PasswordForm } from 'src/entities/users/processes/PasswordForm/PasswordForm';

type FormState = {
  email: string;
  password: string;
  token: string;
};

type Reducer = [
  { type: 'SET_EMAIL'; payload: { email: string; token: string } },
  {
    type: 'SET_PASSWORD';
    payload: {
      password: string;
    };
  },
];

const reducer = (state: FormState, action: Reducer[number]) => {
  return { ...state, ...action.payload };
};

export const ResetPasswordPage = ({ verifyKey }: { verifyKey: string }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, { email: '', password: '', token: '' });
  const { step, increase, decrease } = useStep({ max: 2, initialValue: 0 });

  const [needSignUp, setNeedSignUp] = useState(false);

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: updatePassword,
  });

  const showPrev = !needSignUp && !data;

  return (
    <FormLayout.Container>
      <FormLayout.Header onPrev={showPrev ? (step === 0 ? () => navigate('/login/email') : decrease) : undefined} />
      {!(data || error || needSignUp) && (
        <SwitchCase
          value={step}
          caseBy={{
            0: (
              <EmailForm
                title={
                  <>
                    먼저 서비스 가입 여부를 확인할게요.
                    <br />
                    아이디로 사용한 이메일을 입력해주세요.
                  </>
                }
                signUpKey={verifyKey}
                onSubmitEmail={() => {
                  setNeedSignUp(true);
                }}
                onDuplicated={(email, token) => {
                  dispatch({ type: 'SET_EMAIL', payload: { email, token: token ?? '' } });
                  increase();
                }}
              />
            ),
            1: (
              <PasswordForm
                title={'비밀번호를 입력해주세요.'}
                placeholder={'비밀번호를 입력하세요.'}
                password={state.password}
                isLoading={isPending}
                onSubmit={(password) => {
                  mutate({ ...state, password });
                }}
              />
            ),
          }}
        />
      )}
      {needSignUp && <SignUpNeededPage />}
      {data && <PasswordResetCompletePage />}
      {error && '에러'}
    </FormLayout.Container>
  );
};
