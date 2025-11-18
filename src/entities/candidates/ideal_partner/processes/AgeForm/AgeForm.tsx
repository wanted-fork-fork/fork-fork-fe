import styles from 'src/entities/candidates/ideal_partner/processes/AgeForm/AgeForm.module.css';
import { Radio } from 'src/shared/ui/Radio/Radio';
import { Input } from 'src/shared/ui/Input/Input';
import { ChangeEvent } from 'react';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { getRangeText } from 'src/shared/functions/string';
import { useIdealPartnerFormProcessStore } from 'src/entities/candidates/ideal_partner/processes/_store/idealPartnerFormProcessStore';

export const AgeForm = () => {
  const idealPartnerAge = useIdealPartnerStore((state) => state.ageRange);
  const { min, max } = idealPartnerAge ?? { min: undefined, max: undefined };
  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);
  const hasTouched = useIdealPartnerFormProcessStore((state) => state.touchedSteps).has('IDEAL_AGE');

  const isValid = !(min && max && min > max);

  const toggleAge = useIdealPartnerStore((state) => state.toggleAge);
  const onChangeRadio = (type: boolean) => {
    addTouchedStep('IDEAL_AGE');
    toggleAge(type);
  };

  const setMin = useIdealPartnerStore((state) => state.setMinAge);
  const setMax = useIdealPartnerStore((state) => state.setMaxAge);

  const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
    addTouchedStep('IDEAL_AGE');
    const value = Number(e.target.value);
    if (value <= 0 || isNaN(value)) {
      setMin(undefined);
    } else if (value >= 100) {
      setMin(100);
    } else {
      setMin(Number(e.target.value));
    }
  };

  const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
    addTouchedStep('IDEAL_AGE');
    const value = Number(e.target.value);
    if (value <= 0 || isNaN(value)) {
      setMax(undefined);
    } else if (value >= 100) {
      setMax(100);
    } else {
      setMax(Number(e.target.value));
    }
  };

  return (
    <section className={styles.Container}>
      <div>
        <Radio
          label={'아니요, 나이는 딱히 상관 없어요!'}
          checked={hasTouched && !idealPartnerAge}
          onChange={() => onChangeRadio(false)}
        />
        <Radio
          label={'네, 있어요!'}
          suffix={
            Boolean(isValid && (min || max)) && (
              <span className={styles.RadioSuffix}>
                만{' '}
                {getRangeText(
                  { min, max },
                  { unit: '세', infix: '이상', suffix: '이하', singlePostfix: { min: '이상', max: '이하' } },
                )}
              </span>
            )
          }
          checked={hasTouched && Boolean(idealPartnerAge)}
          onChange={() => onChangeRadio(true)}
        />
        {idealPartnerAge && (
          <div className={styles.AgeDetailWrapper}>
            <div className={styles.AgeInputWrapper}>
              <Input
                placeholder={'최소'}
                value={min ?? ''}
                onChange={onChangeMin}
                inputMode={'numeric'}
                max={100}
                shape={'box'}
              />
              <span>-</span>
              <Input
                placeholder={'최대'}
                value={max ?? ''}
                onChange={onChangeMax}
                inputMode={'numeric'}
                max={100}
                shape={'box'}
              />
            </div>
            {!isValid && <p className={styles.Error}>최솟값보다 큰 값을 입력해주세요.</p>}
          </div>
        )}
      </div>
    </section>
  );
};
