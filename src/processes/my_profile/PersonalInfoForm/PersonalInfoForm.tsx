import { Input } from 'src/shared/ui/Input/Input';
import { Select } from 'src/shared/ui/Select/Select';
import { Radio } from 'src/shared/ui/Radio/Radio';
import styles from './PersonalInfoForm.module.css';
import { useMemo, useState } from 'react';
import { calculateAge } from 'src/entities/profile/lib/calculateAge';

const MINIMUM_YEAR = 1960;
const YearOptionList = Array.from({ length: new Date().getFullYear() - MINIMUM_YEAR + 1 }).map(
  (_, idx) => idx + MINIMUM_YEAR,
);
const MonthOptionList = Array.from({ length: 12 }).map((_, idx) => idx + 1);
const DateOptionList = Array.from({ length: 31 }).map((_, idx) => idx + 1);

/**
 * 내 프로필 입력 > 기본 인적사항
 */
export const PersonalInfoForm = () => {
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
    <section className={styles.Container}>
      <label className={styles.Label}>
        키
        <Input suffixSlot={'cm'} placeholder={'자신의 키를 입력해주세요.'} />
      </label>
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
      <fieldset>
        <legend className={styles.Legend}>성별</legend>
        <div className={styles.InputGroup}>
          <Radio className={styles.InputItem} label={'남자'} value={'MALE'} />
          <Radio className={styles.InputItem} label={'여자'} value={'FEMALE'} />
        </div>
      </fieldset>
      <label className={styles.Label}>
        이름
        <Input placeholder={'이름을 입력해주세요.'} />
      </label>
    </section>
  );
};
