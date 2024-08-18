import { redirect } from '@remix-run/node';

export const redirectToLoginPage = () => {
  if (typeof location !== 'undefined') {
    location.href = '/login';
    return;
  }
  redirect('/login');
};
