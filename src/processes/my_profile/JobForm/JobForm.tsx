import styles from './JobForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { JobJobCategory } from 'src/types';
import { DistributedOmit } from '../../../shared/types/distributedOmit';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const JobMetaList: DistributedOmit<RadioMeta<JobJobCategory>, 'name'>[] = [
  {
    key: 'STUDENT',
    allowInput: true,
    placeholder: '학과나 학교를 입력해주세요.',
  },
  {
    key: 'EMPLOYEE',
    allowInput: true,
    placeholder: '직무나 회사를 입력해주세요.',
  },
  {
    key: 'FREELANCER',
    allowInput: true,
    placeholder: '어떤 사업을 하는지 입력해주세요.',
  },
  {
    key: 'ETC',
    allowInput: true,
    placeholder: '기타 하시는 일을 입력해주세요.',
  },
];

export const JobForm = () => {
  const jobType = useMyProfileStore((state) => state.job.jobCategory);
  const description = useMyProfileStore((state) => state.job.jobName);
  const setJobType = useMyProfileStore((state) => state.setJobCategory);
  const setJobDescription = useMyProfileStore((state) => state.setJobName);

  const onSelect = (job: JobJobCategory) => {
    setJobType(job);
    setJobDescription('');
  };

  const { t } = useTranslation();
  const meta = useMemo(
    () =>
      JobMetaList.map((m) => ({
        ...m,
        name: t(`JOB_${m.key}`),
      })),
    [t],
  );

  return (
    <section className={styles.Container} role={'radiogroup'}>
      <RadioList
        radioMetaList={meta}
        selected={jobType}
        onSelect={onSelect}
        inputValue={description}
        onChangeInputValue={setJobDescription}
      />
    </section>
  );
};
