import { FormLayout } from 'src/pages/layout/FormLayout';
import { SwitchCase } from 'src/shared/ui/SwitchCase';
import { EmailForm } from 'src/processes/EmailForm/EmailForm';
import { useStep } from 'src/shared/functions/useStep';
import { useReducer, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { useMutation } from '@tanstack/react-query';
import { signup } from 'src/types';
import { SignUpCompletePage } from 'src/domains/auth/processes/signup/SignUpCompletePage/SignUpCompletePage';
import { EmailExistErrorPage } from 'src/domains/auth/processes/signup/EmailExistErrorPage/EmailExistErrorPage';
import { PasswordForm } from 'src/processes/PasswordForm/PasswordForm';
import { NameForm } from 'src/processes/NameForm/NameForm';

type SignUpState = {
  email: string;
  password: string;
  name: string;
};

type Reducer = [
  { type: 'SET_EMAIL'; payload: { email: string } },
  {
    type: 'SET_PASSWORD';
    payload: {
      password: string;
    };
  },
  {
    type: 'SET_NAME';
    payload: {
      name: string;
    };
  },
];

const reducer = (state: SignUpState, action: Reducer[number]) => {
  return { ...state, ...action.payload };
};

export const SignUpPage = ({ signUpKey }: { signUpKey: string }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, { email: '', password: '', name: '' });
  const { step, increase, decrease } = useStep({ max: 3, initialValue: 0 });

  const [isDuplicated, setDuplicated] = useState(false);

  const { mutate, isPending, data, error } = useMutation({
    mutationFn: signup,
  });

  return (
    <FormLayout.Container>
      <FormLayout.Header onPrev={step === 0 ? () => navigate('/login/email') : decrease} />
      {!(data || error || isDuplicated) && (
        <SwitchCase
          value={step}
          caseBy={{
            0: (
              <EmailForm
                title={
                  <>
                    구구에 오신 것을 환영합니다!
                    <br />
                    아이디로 사용할 이메일을 입력해주세요.
                  </>
                }
                signUpKey={signUpKey}
                onSubmitEmail={(email) => {
                  dispatch({ type: 'SET_EMAIL', payload: { email } });
                  increase();
                }}
                onDuplicated={() => setDuplicated(true)}
              />
            ),
            1: (
              <PasswordForm
                title={'비밀번호를 입력해주세요.'}
                placeholder={'비밀번호를 입력하세요.'}
                password={state.password}
                onSubmit={(password) => {
                  dispatch({ type: 'SET_PASSWORD', payload: { password } });
                  increase();
                }}
              />
            ),
            2: (
              <NameForm
                title={'이름을 입력해주세요.'}
                name={state.name}
                isLoading={isPending}
                onSubmit={(name) => {
                  dispatch({ type: 'SET_NAME', payload: { name } });
                  mutate({ ...state, name });
                }}
              />
            ),
          }}
        />
      )}
      {isDuplicated && <EmailExistErrorPage />}
      {data && <SignUpCompletePage name={state.name} />}
      {error && '에러'}
    </FormLayout.Container>
  );
};
