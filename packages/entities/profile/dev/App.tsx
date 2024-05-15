import { ProfileCard } from '../src';
import { profileMock } from '../src/api/__mock__/profile.mock';

function App() {
  return <ProfileCard profile={profileMock} headerRightSlot={<button>공유하기</button>} />;
}

export default App;
