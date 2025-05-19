export const redirectToLoginPage = (redirectToOriginalPath = true) => {
  if (typeof location !== 'undefined') {
    if (redirectToOriginalPath) {
      location.href = `/login?path=${encodeURIComponent(location.pathname)}`;
    } else {
      location.href = '/login';
    }
    return;
  }
};
