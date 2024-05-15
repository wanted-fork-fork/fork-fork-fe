import { ProfileList } from 'widgets/profile-list';
import { profileMock } from 'entities/profile';

export const MainPage = () => {
  return <ProfileList profiles={[profileMock, profileMock, profileMock, profileMock]} />;
};
