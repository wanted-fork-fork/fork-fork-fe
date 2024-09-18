import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';
import styles from 'src/shared/ui/Profile/Profile.module.css';
import { Chip } from 'src/shared/ui/Chip/Chip';

export const QuestionInfoGrid = ({ profile }: { profile: MyProfile }) => {
  return (
    <div className={styles.Grid}>
      <div className={styles.GridRow}>
        <div className={styles.Cell}>
          <ProfileCellHeader title={'반려동물'} />
          <div className={styles.HorizontalList}>
            {profile.pets.map((pet) => (
              <Chip key={pet}>{pet}</Chip>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.GridRow}>
        <div className={styles.Cell}>
          <ProfileCellHeader title={'음식'} />
          <div className={styles.HorizontalList}>
            {profile.foods.map((food) => (
              <Chip key={food}>{food}</Chip>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.GridRow}>
        <div className={styles.Cell}>
          <ProfileCellHeader title={'데이트 스타일'} />
          <div className={styles.HorizontalList}>
            {profile.dateStyle.map((style) => (
              <Chip key={style}>{style}</Chip>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.GridRow}>
        <div className={styles.Cell}>
          <ProfileCellHeader title={'인생책'} />
          <b>{profile.book.bookName}</b> <span>{profile.book.cause}</span>
        </div>
      </div>
      <div className={styles.GridRow}>
        <div className={styles.Cell}>
          <ProfileCellHeader title={'인생영화'} />
          <b>{profile.movie.movieName}</b> <span>{profile.movie.cause}</span>
        </div>
      </div>
    </div>
  );
};
