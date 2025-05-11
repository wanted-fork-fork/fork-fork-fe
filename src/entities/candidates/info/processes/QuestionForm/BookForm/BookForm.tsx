import { Input } from 'src/shared/ui/Input/Input';
import { TextArea } from 'src/shared/ui/TextArea/TextArea';
import styles from 'src/entities/candidates/info/processes/QuestionForm/FormContent.module.css';
import { useProfileFirstName } from 'src/entities/candidates/info/utils/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';

export const BookForm = () => {
  const name = useProfileFirstName();
  const { book, setBookName, setBookCause } = useMyProfileStore(({ book, setBookName, setBookCause }) => ({
    book,
    setBookName,
    setBookCause,
  }));

  return (
    <div className={styles.ContentWrapper}>
      <div className={styles.TitleWrapper}>
        <h2>{name}님의 인생책이 있다면 알려주세요.</h2>
        <small>이유도 간단히 적어주시면 더 좋아요</small>
      </div>
      <label>
        <span>책 제목</span>
        <Input
          placeholder={'책 제목을 입력해주세요.'}
          value={book.bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </label>
      <label className={styles.FullHeight}>
        <span>인생책이 된 이유</span>
        <TextArea
          placeholder={'이유를 간략히 입력해주세요.'}
          value={book.cause}
          onChange={(e) => setBookCause(e.target.value)}
        />
      </label>
    </div>
  );
};
