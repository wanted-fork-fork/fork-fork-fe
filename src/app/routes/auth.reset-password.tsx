import { v4 as uuid } from 'uuid';
import { useLoaderData } from '@remix-run/react';
import { ResetPasswordPage } from 'src/pages/auth/reset_password/ResetPasswordPage';

export const loader = () => {
  const key = uuid();

  return { key };
};

export default function ResetPassword() {
  const { key } = useLoaderData<typeof loader>();

  return <ResetPasswordPage verifyKey={key} />;
}
