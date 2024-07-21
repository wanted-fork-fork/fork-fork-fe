import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: '구구' }, { name: 'description', content: '내 사랑을 구해줄래? 구해줄게!' }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Link to={'/form'}>프로필 입력하러 가기</Link>
    </div>
  );
}
