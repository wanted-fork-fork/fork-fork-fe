import styles from './AgeForm.module.css';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { Radio } from 'src/shared/ui/Radio/Radio';
import { Input } from 'src/shared/ui/Input/Input';
import { ChangeEvent } from 'react';

export const AgeForm = () => {
  const idealPartnerAge = useIdealPartnerStore((state) => state.ageRange);
  const { min, max } = idealPartnerAge ?? { min: undefined, max: undefined };

  const toggleAge = useIdealPartnerStore((state) => state.toggleAge);
  const onChangeRadio = (type: boolean) => toggleAge(type);

  const setMin = useIdealPartnerStore((state) => state.setMinAge);
  const setMax = useIdealPartnerStore((state) => state.setMaxAge);

  const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
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
          checked={!idealPartnerAge}
          onChange={() => onChangeRadio(false)}
        />
        <Radio label={'네, 있어요!'} checked={Boolean(idealPartnerAge)} onChange={() => onChangeRadio(true)} />
        {idealPartnerAge && (
          <div className={styles.AgeDetailWrapper}>
            <small>선호하는 연령대를 입력해주세요</small>
            <div className={styles.AgeInputWrapper}>
              <Input
                placeholder={'최소 나이'}
                suffixSlot={<span>세</span>}
                value={min ?? ''}
                onChange={onChangeMin}
                inputMode={'numeric'}
                max={100}
              />
              <span>-</span>
              <Input
                placeholder={'최대 나이'}
                suffixSlot={<span>세</span>}
                value={max ?? ''}
                onChange={onChangeMax}
                inputMode={'numeric'}
                max={100}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
