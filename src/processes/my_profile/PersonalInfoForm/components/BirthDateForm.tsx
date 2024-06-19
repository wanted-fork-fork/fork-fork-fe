import styles from 'src/processes/my_profile/PersonalInfoForm/PersonalInfoForm.module.css';
import { Select } from 'src/shared/ui/Select/Select';
import { useMemo, useState } from 'react';
import { calculateAge } from 'src/entities/profile/lib/calculateAge';

const MINIMUM_YEAR = 1960;
const YearOptionList = Array.from({ length: new Date().getFullYear() - MINIMUM_YEAR + 1 }).map(
  (_, idx) => idx + MINIMUM_YEAR,
);
const MonthOptionList = Array.from({ length: 12 }).map((_, idx) => idx + 1);
const DateOptionList = Array.from({ length: 31 }).map((_, idx) => idx + 1);

export const BirthDateForm = () => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');

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
        <Select required value={year} onChange={(e) => setYear(e.currentTarget.value)}>
          <Select.DefaultItem text={'YYYY'} />
          {YearOptionList.map((year) => (
            <Select.Item key={year} value={year} text={year.toString()} />
          ))}
        </Select>
        <Select required value={month} onChange={(e) => setMonth(e.currentTarget.value)}>
          <Select.DefaultItem text={'MM'} />
          {MonthOptionList.map((month) => (
            <Select.Item key={month} value={month} text={month.toString()} />
          ))}
        </Select>
        <Select required value={date} onChange={(e) => setDate(e.currentTarget.value)}>
          <Select.DefaultItem text={'DD'} />
          {DateOptionList.map((date) => (
            <Select.Item key={date} value={date} text={date.toString()} />
          ))}
        </Select>
      </div>
    </fieldset>
  );
};
