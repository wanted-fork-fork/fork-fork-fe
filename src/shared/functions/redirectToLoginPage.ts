export const redirectToLoginPage = () => {
  if (typeof location !== 'undefined') {
    location.href = `/login?path=${encodeURIComponent(location.pathname)}`;
    return;
  }
};
