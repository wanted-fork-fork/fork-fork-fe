import { lazy } from 'react';
import { Theme } from 'src/shared/styles/constants';
import styles from './LoadingSpinner.module.css';

const Oval = lazy(() => import('react-loader-spinner').then((a) => ({ default: a.Oval })));

export const LoadingSpinner = () => {
  return (
    <Oval
      visible={true}
      height="32"
      width="32"
      color={Theme.color.primary}
      secondaryColor={'transparent'}
      ariaLabel="oval-loading"
      wrapperClass={styles.Spinner}
      wrapperStyle={{
        fill: Theme.color.primary,
      }}
    />
  );
};
