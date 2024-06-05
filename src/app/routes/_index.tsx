import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: '포크포크' }, { name: 'description', content: '포크포크' }];
};

export default function Index() {
  return <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}></div>;
}
