export const redirectToLoginPage = () => {
  if (typeof location !== 'undefined') {
    location.href = '/login';
    return;
  }
};
