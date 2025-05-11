import styles from 'src/entities/candidates/info/processes/my_profile/PersonalInfoForm/PersonalInfoForm.module.css';
import { Select } from 'src/shared/ui/Select/Select';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';
import { useProfileAge } from 'src/entities/candidates/info/entities/libs/useProfileAge';

const MINIMUM_YEAR = 1980;
const YearOptionList = Array.from({ length: new Date().getFullYear() - MINIMUM_YEAR + 1 })
  .map((_, idx) => idx + MINIMUM_YEAR)
  .map((v) => v.toString());
const MonthOptionList = Array.from({ length: 12 })
  .map((_, idx) => idx + 1)
  .map((v) => v.toString());

const DateOptionList = Array.from({ length: 31 })
  .map((_, idx) => idx + 1)
  .map((v) => v.toString());

export const BirthDateForm = () => {
  const year = useMyProfileStore((state) => state.birthDate?.year)?.toString();
  const month = useMyProfileStore((state) => state.birthDate?.month)?.toString();
  const date = useMyProfileStore((state) => state.birthDate?.date)?.toString();
  const age = useProfileAge();
  const setYear = useMyProfileStore((state) => state.setBirthYear);
  const setMonth = useMyProfileStore((state) => state.setBirthMonth);
  const setDate = useMyProfileStore((state) => state.setBirthDate);

  const hasFullDate = year && month && date;

  return (
    <fieldset>
      <legend className={styles.Legend}>나이</legend>
      <div className={styles.InputGroup}>
        <span className={styles.AgeInfo}>만 {hasFullDate ? age : '--'}세</span>
        <Select required value={year ?? ''} placeholder={'YYYY'} onValueChange={(value) => setYear(Number(value))}>
          {YearOptionList.map((year) => (
            <Select.Item key={year} value={year} text={year.toString()} />
          ))}
        </Select>
        <Select required value={month ?? ''} placeholder={'MM'} onValueChange={(value) => setMonth(Number(value))}>
          {MonthOptionList.map((month) => (
            <Select.Item key={month} value={month} text={month.toString()} />
          ))}
        </Select>
        <Select required value={date ?? ''} placeholder={'DD'} onValueChange={(value) => setDate(Number(value))}>
          {DateOptionList.map((date) => (
            <Select.Item key={date} value={date} text={date.toString()} />
          ))}
        </Select>
      </div>
    </fieldset>
  );
};
