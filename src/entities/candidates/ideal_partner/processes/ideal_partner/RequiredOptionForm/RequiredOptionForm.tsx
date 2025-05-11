import styles from 'src/entities/candidates/ideal_partner/processes/ideal_partner/RequiredOptionForm/RequiredOptionForm.module.css';
import { CheckBox } from 'src/shared/ui/CheckBox/CheckBox';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  REQUIRED_OPTION_MAX_COUNT,
  useIdealPartnerStore,
} from 'src/entities/candidates/ideal_partner/entities/models/idealPartnerStore';

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
  const requiredOptions = useIdealPartnerStore((state) => state.requiredOptions);
  const setRequiredOptions = useIdealPartnerStore((state) => state.setRequiredOptions);

  const onSelectValue = useCallback(
    (value: string, selected: boolean) => {
      if (!selected) {
        setRequiredOptions(requiredOptions.filter((x) => x !== value));
        return;
      }
      if (requiredOptions.length >= REQUIRED_OPTION_MAX_COUNT) {
        toast.success('최대 3개까지 선택 가능합니다', { icon: null });
        return;
      }
      setRequiredOptions([...requiredOptions, value]);
    },
    [requiredOptions, setRequiredOptions],
  );

  return (
    <section className={styles.Container}>
      {optionList.map((option) => (
        <CheckBox
          key={option.label}
          checked={requiredOptions.some((o) => o === option.label)}
          label={option.label}
          onChange={(selected) => onSelectValue(option.label, selected)}
        />
      ))}
    </section>
  );
};
