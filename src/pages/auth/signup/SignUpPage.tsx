import { FormLayout } from 'src/pages/layout/FormLayout';
import { SwitchCase } from 'src/shared/ui/SwitchCase';
import { EmailForm } from 'src/processes/signup/EmailForm/EmailForm';
import { PasswordForm } from 'src/processes/signup/PasswordForm/PasswordForm';
import { NameForm } from 'src/processes/signup/NameForm/NameForm';
import { useStep } from 'src/shared/functions/useStep';
import { useReducer } from 'react';
import { useNavigate } from '@remix-run/react';

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

export const SignUpPage = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, { email: '', password: '', name: '' });
  const { step, increase, decrease } = useStep({ max: 3, initialValue: 0 });

  return (
    <FormLayout.Container>
      <FormLayout.Header onPrev={step === 0 ? () => navigate('/login/email') : decrease} />
      <SwitchCase
        value={step}
        caseBy={{
          0: (
            <EmailForm
              onSubmitEmail={(email) => {
                dispatch({ type: 'SET_EMAIL', payload: { email } });
                increase();
              }}
            />
          ),
          1: (
            <PasswordForm
              password={state.password}
              onSubmit={(password) => {
                dispatch({ type: 'SET_PASSWORD', payload: { password } });
                increase();
              }}
            />
          ),
          2: (
            <NameForm
              name={state.name}
              onSubmit={(name) => {
                dispatch({ type: 'SET_NAME', payload: { name } });
                increase();
              }}
            />
          ),
          3: (
            <>
              email: {state.email} pass: {state.password} name: {state.name}
            </>
          ),
        }}
      />
    </FormLayout.Container>
  );
};
