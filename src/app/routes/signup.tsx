import { SignUpPage } from 'src/pages/auth/signup/SignUpPage';
import { v4 as uuid } from 'uuid';
import { useLoaderData } from '@remix-run/react';

export const loader = () => {
  const key = uuid();

  return { key };
};

export default function SignUp() {
  const { key } = useLoaderData<typeof loader>();

  return <SignUpPage signUpKey={key} />;
}
