import { authenticate } from 'src/app/server/authenticate';
import { info, updatePassword, verifyExistedPassword } from 'src/types';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { commitSession } from 'src/app/server/sessions';
import { FormLayout } from 'src/pages/layout/FormLayout';
import { PasswordForm } from 'src/entities/users/processes/PasswordForm/PasswordForm';
import { useMutation } from '@tanstack/react-query';
import { useStep } from 'src/shared/functions/useStep';
import { SwitchCase } from 'src/shared/ui/SwitchCase';
import toast from 'react-hot-toast';
import { useState } from 'react';

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
  const { userInfo } = useLoaderData<typeof loader>();

  const navigate = useNavigate();
  const { step, increase, decrease } = useStep({ max: 2, initialValue: 0 });

  const [verifyError, setVerifyError] = useState(false);
  const { mutate: mutateVerifyPassword, isPending: isLoadingVerify } = useMutation({
    mutationFn: verifyExistedPassword,
    onSuccess: (data) => {
      if (data.data) {
        return increase();
      }
      setVerifyError(true);
    },
    onError: () => setVerifyError(true),
  });

  const { mutate: mutateUpdatePassword, isPending: isLoadingUpdate } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success('비밀번호가 변경되었습니다.');
      navigate('/mypage/edit');
    },
    onError: () => {
      toast.error('비밀번호 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    },
  });

  const handleVerifyPassword = (password: string) => {
    mutateVerifyPassword({ password });
  };

  const handleSubmitPassword = (password: string) => {
    mutateUpdatePassword({ password, email: userInfo.email });
  };

  return (
    <FormLayout.Container>
      <FormLayout.Header onPrev={() => (step > 0 ? decrease : navigate('/mypage/edit'))} />
      <SwitchCase
        caseBy={{
          0: (
            <PasswordForm
              key={'verify'}
              title={
                <>
                  본인 확인을 위해
                  <br /> 기존 비밀번호 먼저 확인할게요.
                </>
              }
              description={''}
              placeholder={'기존에 사용하던 비밀번호를 입력하세요.'}
              password={''}
              errorText={(verifyError && '비밀번호가 일치하지 않습니다.') || undefined}
              onSubmit={handleVerifyPassword}
              buttonText={'다음'}
              checkValid={false}
              isLoading={isLoadingVerify}
            />
          ),
          1: (
            <PasswordForm
              key={'update'}
              title={'새 비밀번호를 입력해주세요.'}
              placeholder={'새 비밀번호를 조건에 맞게 입력해주세요.'}
              password={''}
              onSubmit={handleSubmitPassword}
              buttonText={'완료'}
              isLoading={isLoadingUpdate}
            />
          ),
        }}
        value={step}
      />
    </FormLayout.Container>
  );
}
