import styles from './JobForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { JobType } from 'src/entities/profile/types/profileSummary';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';

const JobMetaList: RadioMeta<JobType>[] = [
  {
    key: 'STUDENT',
    name: '학생(대학원생)',
    allowInput: true,
    placeholder: '학과나 학교를 입력해주세요.',
  },
  {
    key: 'OFFICE_WORKER',
    name: '직장인',
    allowInput: true,
    placeholder: '직무나 회사를 입력해주세요.',
  },
  {
    key: 'FREELANCER',
    name: '자영업자, 프리랜서',
    allowInput: true,
    placeholder: '어떤 사업을 하는지 입력해주세요.',
  },
  {
    key: 'ETC',
    name: '기타',
    allowInput: true,
    placeholder: '기타 하시는 일을 입력해주세요.',
  },
];

export const JobForm = () => {
  const jobType = useMyProfileStore((state) => state.job.jobCategory);
  const description = useMyProfileStore((state) => state.job.jobName);
  const setJobType = useMyProfileStore((state) => state.setJobCategory);
  const setJobDescription = useMyProfileStore((state) => state.setJobName);

  const onSelect = (job: JobType) => {
    setJobType(job);
    setJobDescription('');
  };

  return (
    <section className={styles.Container} role={'radiogroup'}>
      <RadioList
        radioMetaList={JobMetaList}
        selected={jobType}
        onSelect={onSelect}
        inputValue={description}
        onChangeInputValue={setJobDescription}
      />
    </section>
  );
};
