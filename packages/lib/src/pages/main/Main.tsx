import { ProfileList } from 'widgets/profile-list';
import { profileList } from 'widgets/profile-list/api/__mock__/profileList';
import { Profile } from 'entities/profile';
import { Plus } from 'shared/icons';
import { addProfileButton, bodyWrapper, headerWrapper, title, totalText } from './Main.css';

type Props = {
  profiles: Profile[];
};

export const MainPage = ({ profiles }: Props) => {
  return (
    <>
      <nav className={headerWrapper}>
        <h2 className={title}>소개 후보</h2>
        <div>이미지</div>
      </nav>
      <section className={bodyWrapper}>
        <span className={totalText}>총 {profileList.length}명</span>
        <button className={addProfileButton}>
          <Plus />
        </button>
        <ProfileList profiles={profiles} />
      </section>
    </>
  );
};
