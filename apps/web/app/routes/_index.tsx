import type { MetaFunction } from '@remix-run/node';
import { MainPage } from '@repo/fork-fork-lib/pages';
import { profileMock } from '@repo/fork-fork-lib/entities';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

const profiles = [profileMock, profileMock, profileMock, profileMock, profileMock, profileMock, profileMock, profileMock];

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <MainPage profiles={profiles} />
    </div>
  );
}
