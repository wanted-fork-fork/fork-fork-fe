import { authenticate } from 'src/app/server/authenticate';
import { info, updateName } from 'src/types';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import { commitSession } from 'src/app/server/sessions';
import { FormLayout } from 'src/pages/layout/FormLayout';
import { NameForm } from 'src/processes/NameForm/NameForm';
import { useMutation } from '@tanstack/react-query';
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

export default function NameChangePage() {
  const navigate = useNavigate();
  const { userInfo } = useLoaderData<typeof loader>();

  const { mutate, isPending } = useMutation({
    mutationFn: updateName,
    onSuccess: () => {
      toast.success('이름이 변경되었습니다.');
      navigate('/mypage/edit');
    },
  });

  return (
    <FormLayout.Container>
      <FormLayout.Header onPrev={() => navigate('/mypage')} />
      <NameForm
        title={'이름을 변경합니다.'}
        name={userInfo.name}
        isLoading={isPending}
        onSubmit={(name) => mutate({ name })}
      />
    </FormLayout.Container>
  );
}
