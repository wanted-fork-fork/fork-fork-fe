import { authenticate } from 'src/app/server/authenticate';
import { info, updatePassword } from 'src/types';
import { useNavigate } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { commitSession } from 'src/app/server/sessions';
import { FormLayout } from 'src/pages/layout/FormLayout';
import { PasswordForm } from 'src/processes/PasswordForm/PasswordForm';
import { useMutation } from '@tanstack/react-query';
import { useStep } from 'src/shared/functions/useStep';
import { SwitchCase } from 'src/shared/ui/SwitchCase';
import toast from 'react-hot-toast';

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

  const { data: userInfo } = await info({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    { userInfo },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { step, increase, decrease } = useStep({ max: 2, initialValue: 0 });

  useMutation({
    mutationFn: updatePassword,
  });

  const handleSubmitPassword = () => {
    toast.success('비밀번호가 변경되었습니다.');
    navigate('/mypage/edit');
  };

  return (
    <FormLayout.Container>
      <FormLayout.Header onPrev={() => (step > 0 ? decrease : navigate('/mypage'))} />
      <SwitchCase
        caseBy={{
          0: (
            <PasswordForm
              title={
                <>
                  본인 확인을 위해
                  <br /> 기존 비밀번호 먼저 확인할게요.
                </>
              }
              description={''}
              placeholder={'기존에 사용하던 비밀번호를 입력하세요.'}
              password={''}
              onSubmit={increase}
              buttonText={'다음'}
              checkValid={false}
            />
          ),
          1: (
            <PasswordForm
              title={'새 비밀번호를 입력해주세요.'}
              placeholder={'새 비밀번호를 조건에 맞게 입력해주세요.'}
              password={''}
              onSubmit={handleSubmitPassword}
              buttonText={'완료'}
            />
          ),
        }}
        value={step}
      />
    </FormLayout.Container>
  );
}
