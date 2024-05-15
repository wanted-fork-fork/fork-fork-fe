import { ProfileList } from '../src/ui/ProfileList/ProfileList';
import { profileList } from '../src/api/__mock__/profileList';

function App() {
  return <ProfileList profiles={profileList} />;
}

export default App;
