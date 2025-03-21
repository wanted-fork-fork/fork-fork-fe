import styles from './FormLayout.module.css';
import { HTMLProps, PropsWithChildren } from 'react';
import { Header } from 'src/shared/ui/layout/Header/Header';

const Container = ({ children, className = '', ...props }: PropsWithChildren & HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`${styles.Container} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Body = ({ children, className = '', ...props }: PropsWithChildren & HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`${styles.Body} ${className}`} {...props}>
      {children}
    </div>
  );
};

const Footer = ({ children, className = '', ...props }: PropsWithChildren & HTMLProps<HTMLDivElement>) => {
  return (
    <div className={`${styles.Footer} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const FormLayout = {
  Container,
  Header,
  Body,
  Footer,
};
