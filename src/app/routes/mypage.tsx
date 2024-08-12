import { MyPage as _MyPage } from 'src/pages/mypage/MyPage';
import { withLogin } from 'src/entities/auth/withLogin';

export default withLogin(function MyPage() {
  return <_MyPage />;
});
