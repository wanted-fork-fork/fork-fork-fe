import styles from 'src/processes/my_profile/PersonalInfoForm/PersonalInfoForm.module.css';
import { Select } from 'src/shared/ui/Select/Select';
import { useMemo } from 'react';
import { calculateAge } from 'src/entities/profile/lib/calculateAge';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';

const MINIMUM_YEAR = 1960;
const YearOptionList = Array.from({ length: new Date().getFullYear() - MINIMUM_YEAR + 1 }).map(
  (_, idx) => idx + MINIMUM_YEAR,
);
const MonthOptionList = Array.from({ length: 12 }).map((_, idx) => idx + 1);
const DateOptionList = Array.from({ length: 31 }).map((_, idx) => idx + 1);

export const BirthDateForm = () => {
  const year = useMyProfileStore((state) => state.birthDate?.year);
  const month = useMyProfileStore((state) => state.birthDate?.month);
  const date = useMyProfileStore((state) => state.birthDate?.date);
  const setYear = useMyProfileStore((state) => state.setBirthYear);
  const setMonth = useMyProfileStore((state) => state.setBirthMonth);
  const setDate = useMyProfileStore((state) => state.setBirthDate);
  const calculatedAge = useMemo(() => {
    if (!year || !month || !date) {
      return '--';
    }

    return calculateAge(new Date(`${year}-${month}-${date}`));
  }, [year, month, date]);

  return (
    <fieldset>
      <legend className={styles.Legend}>나이</legend>
      <div className={styles.InputGroup}>
        <span className={styles.AgeInfo}>만 {calculatedAge}세</span>
        <Select required value={year} onChange={(e) => setYear(Number(e.currentTarget.value))}>
          <Select.DefaultItem text={'YYYY'} />
          {YearOptionList.map((year) => (
            <Select.Item key={year} value={year} text={year.toString()} />
          ))}
        </Select>
        <Select required value={month} onChange={(e) => setMonth(Number(e.currentTarget.value))}>
          <Select.DefaultItem text={'MM'} />
          {MonthOptionList.map((month) => (
            <Select.Item key={month} value={month} text={month.toString()} />
          ))}
        </Select>
        <Select required value={date} onChange={(e) => setDate(Number(e.currentTarget.value))}>
          <Select.DefaultItem text={'DD'} />
          {DateOptionList.map((date) => (
            <Select.Item key={date} value={date} text={date.toString()} />
          ))}
        </Select>
      </div>
    </fieldset>
  );
};
