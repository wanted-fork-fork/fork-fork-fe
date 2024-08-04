import type { MetaFunction } from '@remix-run/node';
import { GuestPage } from 'src/pages/main/guest/GuestPage';

export const meta: MetaFunction = () => {
  return [{ title: '구구' }, { name: 'description', content: '내 사랑을 구해줄래? 구해줄게!' }];
};

export default function Index() {
  return <GuestPage />;
}
