import styles from './RequiredOptionForm.module.css';
import { useIdlePartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { CheckBox } from 'src/shared/ui/CheckBox/CheckBox';

const optionList: { label: string }[] = [
  { label: '나이' },
  { label: '키 + 선호하는 스타일' },
  { label: '지역' },
  { label: '취미' },
  { label: '종교' },
  { label: '음주 습관' },
  { label: '흡연 여부' },
];

export const RequiredOptionForm = () => {
  const requiredOptions = useIdlePartnerStore((state) => state.requiredOptions);
  const setRequiredOptions = useIdlePartnerStore((state) => state.setRequiredOptions);

  return (
    <section className={styles.Container}>
      {optionList.map((option) => (
        <CheckBox
          key={option.label}
          checked={requiredOptions.some((o) => o === option.label)}
          label={option.label}
          onChange={(value) =>
            value
              ? setRequiredOptions([...requiredOptions, option.label])
              : setRequiredOptions(requiredOptions.filter((x) => x !== option.label))
          }
        />
      ))}
    </section>
  );
};
