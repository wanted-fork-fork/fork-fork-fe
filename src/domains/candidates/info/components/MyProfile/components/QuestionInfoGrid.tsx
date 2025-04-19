import { ProfileCellHeader } from 'src/shared/ui/Profile/ProfileCellHeader';
import styles from 'src/shared/ui/Profile/Profile.module.css';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { EditProfileFunction } from 'src/domains/candidates/components/EditInfo/ProfileEditContext';
import { MyProfile } from 'src/domains/candidates/info/entities/models/myProfileStore';

export const QuestionInfoGrid = ({
  profile,
  onClickEdit,
}: {
  profile: MyProfile;
  onClickEdit?: EditProfileFunction;
}) => {
  const showBlankValue = Boolean(onClickEdit);
  return (
    <div className={styles.Grid}>
      {(showBlankValue || profile.pets.length > 0) && (
        <div className={styles.GridRow}>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'반려동물'} onClickEdit={() => onClickEdit?.('PROFILE_MORE_QUESTION')} />
            <div className={styles.ChipList}>
              {profile.pets.map((pet) => (
                <Chip key={pet}>{pet}</Chip>
              ))}
            </div>
          </div>
        </div>
      )}
      {(showBlankValue || profile.foods.length > 0) && (
        <div className={styles.GridRow}>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'음식'} onClickEdit={() => onClickEdit?.('PROFILE_MORE_QUESTION')} />
            <div className={styles.ChipList}>
              {profile.foods.map((food) => (
                <Chip key={food}>{food}</Chip>
              ))}
            </div>
          </div>
        </div>
      )}
      {(showBlankValue || profile.dateStyle.length > 0) && (
        <div className={styles.GridRow}>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'데이트 스타일'} onClickEdit={() => onClickEdit?.('PROFILE_MORE_QUESTION')} />
            <div className={styles.ChipList}>
              {profile.dateStyle.map((style) => (
                <Chip key={style}>{style}</Chip>
              ))}
            </div>
          </div>
        </div>
      )}
      {(showBlankValue || profile.book.bookName) && (
        <div className={styles.GridRow}>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'인생책'} onClickEdit={() => onClickEdit?.('PROFILE_MORE_QUESTION')} />
            <b>{profile.book.bookName}</b> <span>{profile.book.cause}</span>
          </div>
        </div>
      )}
      {(showBlankValue || profile.movie.movieName) && (
        <div className={styles.GridRow}>
          <div className={styles.Cell}>
            <ProfileCellHeader title={'인생영화'} onClickEdit={() => onClickEdit?.('PROFILE_MORE_QUESTION')} />
            <b>{profile.movie.movieName}</b> <span>{profile.movie.cause}</span>
          </div>
        </div>
      )}
    </div>
  );
};
