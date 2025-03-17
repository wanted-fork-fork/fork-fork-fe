import { authenticate } from 'src/app/server/authenticate';
import { info } from 'src/types';
import { json, LoaderFunction } from '@remix-run/node';
import { commitSession } from 'src/app/server/sessions';
import { Link } from '@remix-run/react';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { ArrowLeft } from 'src/shared/ui/icons';
import styles from 'src/pages/mypage/notification/NotificationConfigPage.module.css';
import { PRIVACY_POLICY_URL, TERM_URL } from 'src/shared/constants/url';
import { Button } from 'src/shared/ui/Button/Button';

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

  const { data: userInfo } = await info({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    { userInfo },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export default function MyPage() {
  return (
    <>
      <Header
        prefixSlot={
          <Link to={'/mypage'}>
            <ArrowLeft />
          </Link>
        }
      >
        약관 및 정책
      </Header>
      <div className={styles.Body}>
        <Link to={PRIVACY_POLICY_URL}>
          <Button
            className={styles.ButtonRow}
            color={'neutral'}
            variant={'ghost'}
            widthType={'fill'}
            textAlign={'left'}
          >
            개인정보처리방침
          </Button>
        </Link>
        <Link to={TERM_URL}>
          <Button
            className={styles.ButtonRow}
            color={'neutral'}
            variant={'ghost'}
            widthType={'fill'}
            textAlign={'left'}
          >
            이용정책
          </Button>
        </Link>
      </div>
    </>
  );
}
