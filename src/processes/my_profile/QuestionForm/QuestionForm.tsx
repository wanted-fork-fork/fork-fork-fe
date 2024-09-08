import { Button } from 'src/shared/ui/Button/Button';
import { Check, Plus } from 'src/shared/ui/icons';
import styles from './QuestionForm.module.css';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { ReactNode, useState } from 'react';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { BookForm } from 'src/processes/my_profile/QuestionForm/BookForm/BookForm';
import { DateStyleForm } from 'src/processes/my_profile/QuestionForm/DateStyleForm/DateStyleForm';
import { FoodForm } from 'src/processes/my_profile/QuestionForm/FoodForm/FoodForm';
import { MovieForm } from 'src/processes/my_profile/QuestionForm/MovieForm/MovieForm';
import { PetForm } from 'src/processes/my_profile/QuestionForm/PetForm/PetForm';
import { Theme } from 'src/shared/styles/constants';

type QuestionType = 'PET' | 'DATE_STYLE' | 'FOOD' | 'DRIVING' | 'BOOK' | 'MOVIE';

const QuestionInputMap: Record<QuestionType, ReactNode> = {
  BOOK: <BookForm />,
  DATE_STYLE: <DateStyleForm />,
  DRIVING: 'DRIVING',
  FOOD: <FoodForm />,
  MOVIE: <MovieForm />,
  PET: <PetForm />,
};

export const QuestionForm = () => {
  const { pets, movie, book, dateStyle, foods } = useMyProfileStore(({ pets, movie, book, dateStyle, foods }) => ({
    pets,
    movie,
    book,
    dateStyle,
    foods,
  }));
  const [inputType, setInputType] = useState<QuestionType | null>('FOOD');

  const onClickQuestionButton = (type: QuestionType) => {
    setInputType(type);
  };

  const onClose = () => setInputType(null);

  return (
    <div className={styles.Wrapper}>
      <QuestionButton filled={pets.length > 0} onClick={() => onClickQuestionButton('PET')} text={'반려동물'} />
      <QuestionButton
        filled={dateStyle.length > 0}
        onClick={() => onClickQuestionButton('DATE_STYLE')}
        text={'데이트 스타일'}
      />
      <QuestionButton filled={foods.length > 0} onClick={() => onClickQuestionButton('FOOD')} text={'좋아하는 음식'} />
      <QuestionButton filled={Boolean(book.bookName)} onClick={() => onClickQuestionButton('BOOK')} text={'인생책'} />
      <QuestionButton
        filled={Boolean(movie.movieName)}
        onClick={() => onClickQuestionButton('MOVIE')}
        text={'인생 영화'}
      />
      <BottomSheet isOpen={Boolean(inputType)} onClose={onClose}>
        <BottomSheet.Header onClose={onClose} />
        <BottomSheet.Content
          footerSlot={
            <Button variant={'filled'} color={'primary'} widthType={'fill'} onClick={onClose}>
              저장
            </Button>
          }
        >
          {inputType && QuestionInputMap[inputType]}
        </BottomSheet.Content>
      </BottomSheet>
    </div>
  );
};

const QuestionButton = ({ text, filled, onClick }: { text: string; filled: boolean; onClick: () => void }) => (
  <Button
    className={styles.Button}
    color={filled ? 'primary' : 'neutral'}
    variant={'outline'}
    widthType={'fill'}
    size={'M'}
    textAlign={'left'}
    suffixSlot={filled ? <Check color={Theme.color.primary} width={24} /> : <Plus color={Theme.color.neutral30} />}
    onClick={onClick}
  >
    {text}
  </Button>
);
