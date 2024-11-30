import errorPageStyles from 'src/app/styles/error.module.css';
import { Link } from '@remix-run/react';
import { Button } from 'src/shared/ui/Button/Button';

export const ErrorPage = ({
  title,
  description,
  buttonText,
  buttonLink,
}: {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}) => {
  return (
    <div className={errorPageStyles.Wrapper}>
      <div className={errorPageStyles.TitleSection}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <img className={errorPageStyles.Image} src="/images/404.png" alt="페이지를 찾을 수 없습니다" />
      {(buttonLink && buttonText && (
        <Link to={buttonLink}>
          <Button variant={'filled'} widthType={'fill'} color={'primary'}>
            {buttonText}
          </Button>
        </Link>
      )) || <div />}
    </div>
  );
};
