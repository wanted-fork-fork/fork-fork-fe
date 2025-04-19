import { FormLayout } from 'src/pages/layout/FormLayout';
import { SwitchCase } from 'src/shared/ui/SwitchCase';
import { EmailForm } from 'src/domains/auth/processes/signup/EmailForm/EmailForm';
import { useStep } from 'src/shared/functions/useStep';
import { useReducer, useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { useMutation } from '@tanstack/react-query';
import { updatePassword } from 'src/types';
import { SignUpNeededPage } from 'src/domains/auth/processes/reset_password/EmailExistErrorPage/SignUpNeededPage';
import { PasswordResetCompletePage } from 'src/domains/auth/processes/reset_password/SignUpCompletePage/PasswordResetCompletePage';
import { PasswordForm } from 'src/domains/auth/processes/reset_password/PasswordForm/PasswordForm';

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

  return (
    <FormLayout.Container>
      <FormLayout.Header onPrev={step === 0 ? () => navigate('/login/email') : decrease} />
      {!(data || error || needSignUp) && (
        <SwitchCase
          value={step}
          caseBy={{
            0: (
              <EmailForm
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
