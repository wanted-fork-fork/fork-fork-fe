import { useState } from 'react';
import styles from './JobForm.module.css';
import { RadioWithInput } from 'src/shared/ui/RadioWithInput/RadioWithInput';

const JobTypeList = ['STUDENT', 'OFFICE_WORKER', 'FREELANCER', 'ETC'];
type JobType = (typeof JobTypeList)[number];

const JobMetaMap: Record<JobType, { name: string; inputPlaceHolder: string }> = {
  STUDENT: {
    name: '학생(대학원생)',
    inputPlaceHolder: '학과나 학교를 입력해주세요.',
  },
  OFFICE_WORKER: {
    name: '직장인',
    inputPlaceHolder: '직무나 회사를 입력해주세요.',
  },
  FREELANCER: {
    name: '자영업자, 프리랜서',
    inputPlaceHolder: '어떤 사업을 하는지 입력해주세요.',
  },
  ETC: {
    name: '기타',
    inputPlaceHolder: '기타 하시는 일을 입력해주세요.',
  },
};

export const JobForm = () => {
  const [selected, setSelected] = useState<JobType | null>(null);
  const [inputValue, setInputValue] = useState<string>('');

  const onSelect = (job: JobType) => {
    setSelected(job);
    setInputValue('');
  };

  return (
    <section className={styles.Container} role={'radiogroup'}>
      {JobTypeList.map((job) => (
        <RadioWithInput
          key={job}
          label={JobMetaMap[job].name}
          checked={selected === job}
          onChange={() => onSelect(job)}
          inputPlaceholder={JobMetaMap[job].inputPlaceHolder}
          inputValue={inputValue}
          onChangeInputValue={setInputValue}
        />
      ))}
    </section>
  );
};
