import { Input } from 'src/shared/ui/Input/Input';
import { TextArea } from 'src/shared/ui/TextArea/TextArea';
import styles from 'src/entities/candidates/info/processes/my_profile/QuestionForm/FormContent.module.css';
import { useProfileFirstName } from 'src/entities/candidates/info/entities/libs/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';

export const MovieForm = () => {
  const name = useProfileFirstName();
  const { movie, setMovieName, setMovieCause } = useMyProfileStore(({ movie, setMovieName, setMovieCause }) => ({
    movie,
    setMovieName,
    setMovieCause,
  }));

  return (
    <div className={styles.ContentWrapper}>
      <div className={styles.TitleWrapper}>
        <h2>{name}님의 인생 영화가 있다면 알려주세요.</h2>
        <small>이유도 간단히 적어주시면 더 좋아요</small>
      </div>
      <label>
        <span>영화 제목</span>
        <Input
          placeholder={'영화 제목을 입력해주세요.'}
          value={movie.movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
      </label>
      <label className={styles.FullHeight}>
        <span>인생 영화가 된 이유</span>
        <TextArea
          placeholder={'이유를 간략히 입력해주세요.'}
          value={movie.cause}
          onChange={(e) => setMovieCause(e.target.value)}
        />
      </label>
    </div>
  );
};
