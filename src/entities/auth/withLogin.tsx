import { ComponentType } from 'react';
import { useAuthStore } from 'src/entities/auth/useAuthStore';

export const withLogin = <P extends JSX.IntrinsicAttributes>(Component: ComponentType<P>) => {
  const Wrapped = (props: P) => {
    const { isLoggedIn } = useAuthStore();

    if (typeof window === 'undefined') return <></>;

    if (!isLoggedIn) {
      location.href = '/login';
      return <></>;
    }

    return <Component {...props} />;
  };

  return Wrapped;
};
